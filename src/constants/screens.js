export default [
  {
    name: 'IntroScreen',
    previousScreen: null,
    nextScreen: 'GoalScreen',
  },
  {
    name: 'GoalScreen',
    previousScreen: 'IntroScreen',
    nextScreen: 'BrainstormScreen',
  },
  {
    name: 'BrainstormScreen',
    previousScreen: 'GoalScreen',
    nextScreen: 'MappingScreen',
  },
  {
    name: 'MappingScreen',
    previousScreen: 'BrainstormScreen',
    nextScreen: 'DashboardScreen',
  },
  {
    name: 'DashboardScreen',
    previousScreen: 'MappingScreen',
    nextScreen: null,
  },
];
