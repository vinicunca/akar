import type { PohonModuleOptions } from '../module';

export default (options: Required<PohonModuleOptions>) => {
  return {
    slots: {
      root: '',
      header: '',
      body: '',
      heading: '',
      grid: '',
      gridRow: '',
      gridWeekDaysRow: '',
      gridBody: '',
      headCell: '',
      cell: '',
      cellTrigger: '',
    },
    variants: {
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color) => [
          color,
          {
            headCell: '',
            cellTrigger: '',
          },
        ])),
        neutral: {
          headCell: '',
          cellTrigger: '',
        },
      },
      size: {
        xs: {
          heading: '',
          cell: '',
          headCell: '',
          cellTrigger: '',
          body: '',
        },
        sm: {
          heading: '',
          headCell: '',
          cell: '',
          cellTrigger: '',
        },
        md: {
          heading: '',
          headCell: '',
          cell: '',
          cellTrigger: '',
        },
        lg: {
          heading: '',
          headCell: '',
          cellTrigger: '',
        },
        xl: {
          heading: '',
          headCell: '',
          cellTrigger: '',
        },
      },
    },
  };
};
