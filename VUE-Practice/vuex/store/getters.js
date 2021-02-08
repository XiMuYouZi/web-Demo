export default {
  powerCounter(state) {
    return state.counter * state.counter;
  },
  ageGreaterThan20(state) {
    return state.students.filter(stu => stu.age > 20);
  },
  ageGreaterThan20Num(state, getters) {
    return getters.ageGreaterThan20.length;
  },
  //返回一个函数，让使用者传入参数
  studentsAgeGreaterThan(state) {
    //返回箭头函数
    return age => {
      return state.students.filter(stu => stu.age > age);
    };

    //返回匿名函数
    // return function (age){
    //     return state.students.filter(stu => stu.age > age)}
    // }
  }
};
