export default {
  fibNumbers: {
    '0': '0',
    '1': '1',
    '2':'1'
  },

  getNumberAt: function(index) {
    console.log('fib.getNumberAt index: ' + index);
    if(!(typeof this.fibNumbers[index] === 'undefined')) return this.fibNumbers[index];
    var result = this.sumTwoStrings(this.getNumberAt(index-2), this.getNumberAt(index-1), '0')
    this.fibNumbers[index] = result;
    return result;
  },

  sumTwoStrings: function(addend1 = '0', addend2 = '0', carriedIn = '0') {
    if(addend1.length < 1) addend1 = '0';
    if(addend2.length < 1) addend2 = '0';
//    console.log('sumTwoStrings(' + addend1 + ', ' + addend2 + ', ' + carriedIn + ')');
    if(addend1.length === 1 && addend2.length === 1) {
      return (Number(addend1) + Number(addend2) + Number(carriedIn)).toString();
    }
    var addNow1, addNow2, addLater1, addLater2;
    addNow1 = addend1.substring(addend1.length - 1, addend1.length);
    addNow2 = addend2.substring(addend2.length - 1, addend2.length);
    addLater1 = addend1.substring(0, addend1.length - 1);
    addLater2 = addend2.substring(0, addend2.length - 1);
    var result = (Number(addNow1) + Number(addNow2) + Number(carriedIn));
    return this.sumTwoStrings(addLater1, addLater2, (parseInt(result / 10)).toString()) + (result % 10).toString();
  }
};
