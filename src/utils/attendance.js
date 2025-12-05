export const flattenAttendanceData = (data) => {
  if (!data || !data.data || !data.data.attendanceCourseComponentInfoList) {
    return [];
  }

  const flattened = [];

  data.data.attendanceCourseComponentInfoList.forEach((course) => {
    if (course.attendanceCourseComponentNameInfoList) {
      course.attendanceCourseComponentNameInfoList.forEach((component) => {
        // Filter out courses with 0 periods (e.g., Social Internship)
        if (component.numberOfPeriods > 0) {
          flattened.push({
            name: course.courseName,
            code: course.courseCode,
            total: component.numberOfPeriods,
            present: component.numberOfPresent,
            percent: component.presentPercentage,
            type: component.componentName,
            variant: component.courseVariant,
          });
        }
      });
    }
  });

  return flattened;
};

export const calculateStats = (flatData) => {
  if (!flatData || flatData.length === 0) {
    return {
      totalBunks: 0,
      hoursSaved: 0,
      highest: null,
      lowest: null,
      totalClasses: 0,
      totalPresent: 0,
      overallPercent: 0,
    };
  }

  let totalBunks = 0;
  let totalClasses = 0;
  let totalPresent = 0;
  let highest = flatData[0];
  let lowest = flatData[0];

  flatData.forEach((item) => {
    const bunks = item.total - item.present;
    totalBunks += bunks;
    totalClasses += item.total;
    totalPresent += item.present;

    if (item.percent > highest.percent) {
      highest = item;
    }

    // Find lowest but ignore 0% if possible, unless all are 0
    if (item.percent < lowest.percent && item.percent > 0) {
      lowest = item;
    } else if (lowest.percent === 0 && item.percent > 0) {
      lowest = item;
    }
  });

  // If lowest is still 0 and we have other data, try to find the min non-zero again if needed,
  // but the logic above handles switching from 0 to non-zero.
  // If real lowest is indeed 0, we might want to show that.
  // Let's refine: Lowest should be the minimum percentage > 0 if possible.
  // If all are 0, then 0.

  const nonZeroCourses = flatData.filter((c) => c.percent > 0);
  if (nonZeroCourses.length > 0) {
    lowest = nonZeroCourses.reduce(
      (min, curr) => (curr.percent < min.percent ? curr : min),
      nonZeroCourses[0]
    );
  }

const hoursSaved = Math.round((totalBunks * 50) / 60);

  return {
    totalBunks,
    hoursSaved,
    highest,
    lowest,
    totalClasses,
    totalPresent,
    overallPercent:
      totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0,
  };
};
