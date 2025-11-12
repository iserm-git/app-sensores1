import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  SensorLab: undefined;
  Attendance: undefined;
};

export type SensorLabStackParamList = {
  SensorLabMenu: undefined;
  Module1: undefined;
  Module2: undefined;
  Module3: undefined;
  Module4: undefined;
  Module5: undefined;
  BubbleLevel: undefined;
  MazeGame: undefined;
  StepCounter: undefined;
};

export type AttendanceStackParamList = {
  AttendanceMenu: undefined;
  AttendanceShake: { studentId: string; studentName: string; courseId: string };
  AttendanceList: { courseId: string };
  AttendanceStats: { studentId: string };
  AttendanceReport: { courseId: string };
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type SensorLabMenuNavigationProp = StackNavigationProp<SensorLabStackParamList, 'SensorLabMenu'>;
export type AttendanceShakeNavigationProp = StackNavigationProp<AttendanceStackParamList, 'AttendanceShake'>;
export type AttendanceShakeRouteProp = RouteProp<AttendanceStackParamList, 'AttendanceShake'>;
