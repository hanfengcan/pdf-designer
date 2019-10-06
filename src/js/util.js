export default {
  mm2px(mm) {
    // 96px = 25.4mm
    let result = mm;
    if (typeof mm === 'string') {
      result = mm.replace('mm', '');
    }
    result = Math.floor(result * 96 / 25.4);
    return result;
  },
};
