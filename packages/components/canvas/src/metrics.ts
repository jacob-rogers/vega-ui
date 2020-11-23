export const metrics = {
  grid: {
    blockSize: 116, // Элемент сетки квадрат со стороной 116px
  },
  zoom: {
    ratio: 1.04, // Коэффициент масштабирования, определяет скорост приближения/отдаления
  },
  scrollbar: {
    fill: 'gray',
    opacity: 0.8,
    horizontal: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      width: 100,
      height: 10,
    },
    vertical: {
      marginTop: 10,
      marginRight: 10,
      marginBottom: 10,
      width: 10,
      height: 100,
    },
  },
  connectionLine: {
    stroke: '#fff',
    strokeSelected: '#0078D2',
    strokeWidth: 3,
  },
  connector: {
    radius: 6,
    stroke: 'rgba(255, 255, 255, 0.2)',
    strokeSelected: '#0078D2',
    strokeActive: '#fff',
    strokeWidth: 2,
    fill: '#161A1D',
  },
  extremePoint: {
    cornerRadius: 2,
    stroke: undefined,
    strokeSelected: '#0078D2',
    strokeWidth: 2,
    fill: '#0078D2',
    height: 40,
    padding: {
      left: 12,
      right: 12,
    },
    name: {
      fontSize: 14,
      lineHeight: 1.4,
      fill: '#FAFAFA',
    },
  },
  step: {
    cornerRadius: 2,
    stroke: 'rgba(255, 255, 255, 0.2)',
    strokeSelected: 'rgba(255, 255, 255, 0.9)',
    strokeWidth: 2,
    width: 251,
    emptyHeight: 40,
    headerHeight: 39,
    padding: {
      top: 8,
      left: 12,
      right: 36,
      bottom: 12,
    },
    name: {
      fontSize: 14,
      lineHeight: 1.4,
      fill: '#FAFAFA',
    },
    event: {
      width: 227,
      fill: '#22272B',
      headerHeight: 41,
      emptyHeight: 40,
      marginBottom: 8,
      padding: {
        top: 10,
        left: 12,
        right: 12,
        bottom: 12,
      },
      name: {
        fontSize: 14,
        lineHeight: 1.4,
        fill: '#FAFAFA',
      },
    },
    container: {
      width: 203,
      padding: {
        top: 4,
        left: 4,
        bottom: 4,
      },
    },
    object: {
      width: 195,
      height: 32,
      marginBottom: 4,
      cornerRadius: 2,
      fill: '#4f5255',
      padding: {
        top: 6,
        left: 28,
        right: 14,
      },
      name: {
        fontSize: 14,
        lineHeight: 1.5,
        fill: '#FAFAFA',
      },
      icon: {
        top: 11,
        left: 11,
      },
    },
    icon: {
      top: 12,
      left: 227,
    },
    connector: {
      position: {
        y: 12,
      },
    },
  },
};
