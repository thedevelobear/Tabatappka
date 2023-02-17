export {};
// import 'jsdom-global/register';
// import React from 'react';
//
// import { render, fireEvent } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
//
// import { useWorkoutTimer } from './useWorkoutTimer';
//
// import type { Config } from './types';
//
// jest.useFakeTimers();
//
// describe('Start', () => {
//   it('should start timer', () => {
//     const Component = () => {
//       const { time, start } = useWorkoutTimer();
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByRole, getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('5');
//   });
//
//   it('should start timer with an initial status of PAUSED', () => {
//     // Given
//     const Component = () => {
//       const { status, time } = useWorkoutTimer({
//         initialStatus: 'PAUSED',
//       });
//
//       return (
//         <div>
//           <p data-testid="time">{time}</p>
//           <p data-testid="status">{status}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId } = render(<Component />);
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     // Then
//     expect(getByTestId('status').textContent).toBe('PAUSED');
//     expect(getByTestId('time').textContent).toBe('0');
//   });
//
//   it('should autostart timer with an initial status of RUNNING', () => {
//     // Given
//     const Component = () => {
//       const { time } = useWorkoutTimer({
//         initialStatus: 'RUNNING',
//       });
//
//       return <p data-testid="time">{time}</p>;
//     };
//
//     const { getByTestId } = render(<Component />);
//
//     act(() => {
//       jest.advanceTimersByTime(20_000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('20');
//   });
//
//   it('should start timer with an initial time of 10', () => {
//     // Given
//     const Component = () => {
//       const { time, start } = useWorkoutTimer({
//         initialTime: 10,
//       });
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByRole, getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('15');
//   });
//
//   it('should re-start timer with updated initialTime', () => {
//     // Given
//     const Component: React.FC<Partial<Config>> = ({ initialTime }) => {
//       const { time, start, reset } = useWorkoutTimer({
//         initialTime,
//       });
//
//       return (
//         <div>
//           <button data-testid="start" onClick={start}>
//             Start
//           </button>
//           <button data-testid="reset" onClick={reset}>
//             Reset
//           </button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId, rerender } = render(<Component initialTime={10} />);
//     const startButton = getByTestId('start');
//     const resetButton = getByTestId('reset');
//
//     // When
//     fireEvent.click(startButton);
//
//     rerender(<Component initialTime={20} />);
//
//     // When
//     fireEvent.click(resetButton);
//     fireEvent.click(startButton);
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('20');
//   });
//
//   it('should start decremental timer with an initial time of 100', () => {
//     // Given
//     const Component = () => {
//       const { time, start } = useWorkoutTimer({
//         initialTime: 100,
//         timerType: 'DECREMENTAL',
//       });
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByRole, getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(20_000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('80');
//   });
//
//   it('should update time with an interval of 2000 milliseconds', () => {
//     // Given
//     const Component = () => {
//       const { time, start } = useWorkoutTimer({
//         interval: 2000,
//       });
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByRole, getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(10_000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('5');
//   });
//
//   it('should autostart', () => {
//     // Given
//     const Component = () => {
//       const { time } = useWorkoutTimer({
//         autostart: true,
//       });
//
//       return <p data-testid="time">{time}</p>;
//     };
//
//     const { getByTestId } = render(<Component />);
//
//     act(() => {
//       jest.advanceTimersByTime(20_000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('20');
//   });
// });
//
// describe('Stop', () => {
//   it('should stop incremental timer when time is over', () => {
//     // Given
//     const Component = () => {
//       const { time, start } = useWorkoutTimer({
//         endTime: 25,
//         initialTime: 5,
//       });
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByRole, getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(40_000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('25');
//   });
//
//   it('should stop decremental timer when time is over', () => {
//     // Given
//     const Component = () => {
//       const { time, start } = useWorkoutTimer({
//         endTime: 10,
//         initialTime: 30,
//         timerType: 'DECREMENTAL',
//       });
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByRole, getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(30_000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('10');
//   });
// });
//
// describe('Pause', () => {
//   it('should pause timer', () => {
//     // Given
//     const Component = () => {
//       const { time, start, pause } = useWorkoutTimer();
//
//       return (
//         <div>
//           <button data-testid="start" onClick={start}>
//             Start
//           </button>
//           <button data-testid="pause" onClick={pause}>
//             Start
//           </button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByTestId('start'));
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     fireEvent.click(getByTestId('pause'));
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('5');
//   });
//
//   it('should pause timer with an end time', () => {
//     // Given
//     const Component = () => {
//       const { time, start, pause } = useWorkoutTimer({
//         endTime: 5,
//       });
//
//       return (
//         <div>
//           <button data-testid="start" onClick={start}>
//             Start
//           </button>
//           <button data-testid="pause" onClick={pause}>
//             Start
//           </button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId } = render(<Component />);
//     const startButton = getByTestId('start');
//     const pauseButton = getByTestId('pause');
//     const time = getByTestId('time');
//
//     // When
//     fireEvent.click(startButton);
//
//     act(() => {
//       jest.advanceTimersByTime(3000);
//     });
//
//     fireEvent.click(pauseButton);
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     fireEvent.click(startButton);
//
//     // Then
//     expect(time.textContent).toBe('3');
//
//     act(() => {
//       jest.advanceTimersByTime(3000);
//     });
//
//     expect(time.textContent).toBe('5');
//   });
// });
//
// describe('Reset', () => {
//   it('should reset timer to default initial time', () => {
//     // Given
//     const Component = () => {
//       const { time, start, reset } = useWorkoutTimer();
//
//       return (
//         <div>
//           <button data-testid="start" onClick={start}>
//             Start
//           </button>
//           <button data-testid="reset" onClick={reset}>
//             Reset
//           </button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId } = render(<Component />);
//     const startButton = getByTestId('start');
//     const resetButton = getByTestId('reset');
//     const time = getByTestId('time');
//
//     // When
//     fireEvent.click(startButton);
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     fireEvent.click(resetButton);
//
//     // Then
//     expect(time.textContent).toBe('0');
//   });
//
//   it('should reset timer to default initial time after restart', () => {
//     // Given
//     const Component = () => {
//       const { time, start } = useWorkoutTimer({
//         endTime: 10,
//       });
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByRole, getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(10_000);
//     });
//
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('5');
//   });
//
//   it('should reset timer to initial time of 20', () => {
//     // Given
//     const Component = () => {
//       const { time, start, reset } = useWorkoutTimer({
//         initialTime: 20,
//       });
//
//       return (
//         <div>
//           <button data-testid="start" onClick={start}>
//             Start
//           </button>
//           <button data-testid="reset" onClick={reset}>
//             Reset
//           </button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByTestId('start'));
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     fireEvent.click(getByTestId('reset'));
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('20');
//   });
// });
//
// describe('Advance time', () => {
//   it('should advance time and add 10 to time value', () => {
//     // Given
//     const Component = () => {
//       const { advanceTime, time, start } = useWorkoutTimer({
//         initialTime: 0,
//       });
//
//       return (
//         <div>
//           <button data-testid="start" onClick={start}>
//             Start
//           </button>
//           <button data-testid="advanceTime" onClick={() => advanceTime(10)}>
//             Advance time
//           </button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByTestId('start'));
//
//     act(() => {
//       jest.advanceTimersByTime(5000);
//     });
//
//     // When
//     fireEvent.click(getByTestId('advanceTime'));
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('15');
//   });
//
//   it('should advance time and remove 5 to time value when timer type is decremental', () => {
//     // Given
//     const Component = () => {
//       const { advanceTime, time, start } = useWorkoutTimer({
//         initialTime: 30,
//         timerType: 'DECREMENTAL',
//       });
//
//       return (
//         <div>
//           <button data-testid="start" onClick={start}>
//             Start
//           </button>
//           <button data-testid="advanceTime" onClick={() => advanceTime(5)}>
//             Advance time
//           </button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByTestId('start'));
//
//     act(() => {
//       jest.advanceTimersByTime(10_000);
//     });
//
//     // When
//     fireEvent.click(getByTestId('advanceTime'));
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('15');
//   });
//
//   it('should continue to update time after it has been advanced', () => {
//     // Given
//     const Component = () => {
//       const { advanceTime, time, start } = useWorkoutTimer({
//         initialTime: 0,
//       });
//
//       return (
//         <div>
//           <button data-testid="start" onClick={start}>
//             Start
//           </button>
//           <button data-testid="advanceTime" onClick={() => advanceTime(50)}>
//             Advance time
//           </button>
//           <p data-testid="time">{time}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId } = render(<Component />);
//
//     // When
//     fireEvent.click(getByTestId('start'));
//
//     act(() => {
//       jest.advanceTimersByTime(10_000);
//     });
//
//     // When
//     fireEvent.click(getByTestId('advanceTime'));
//
//     act(() => {
//       jest.advanceTimersByTime(20_000);
//     });
//
//     // Then
//     expect(getByTestId('time').textContent).toBe('80');
//   });
// });
//
// describe('State and callbacks', () => {
//   it('should display "RUNNING" text when timer is running', () => {
//     // Given
//     const Component = () => {
//       const { status, start, pause, reset } = useWorkoutTimer({
//         initialTime: 20,
//       });
//
//       return (
//         <div>
//           <button data-testid="start" onClick={start}>
//             Start
//           </button>
//           <button data-testid="pause" onClick={pause}>
//             Pause
//           </button>
//           <button data-testid="reset" onClick={reset}>
//             Reset
//           </button>
//           <p data-testid="status">{status}</p>
//         </div>
//       );
//     };
//
//     const { getByTestId } = render(<Component />);
//     const startButton = getByTestId('start');
//     const pauseButton = getByTestId('pause');
//     const resetButton = getByTestId('reset');
//     const statusBlock = getByTestId('status');
//
//     // When
//     fireEvent.click(startButton);
//
//     // Then
//     expect(statusBlock.textContent).toBe('RUNNING');
//
//     // When
//     fireEvent.click(pauseButton);
//
//     // Then
//     expect(statusBlock.textContent).toBe('PAUSED');
//
//     // When
//     fireEvent.click(startButton);
//
//     // Then
//     expect(statusBlock.textContent).toBe('RUNNING');
//
//     // When
//     fireEvent.click(resetButton);
//
//     // Then
//     expect(statusBlock.textContent).toBe('STOPPED');
//   });
//
//   it('should call callback function when time is over', () => {
//     // Given
//     const onTimeOver = jest.fn();
//     const Component = () => {
//       const { start } = useWorkoutTimer({
//         endTime: 30,
//         initialTime: 0,
//         onTimeOver,
//       });
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//         </div>
//       );
//     };
//
//     const { getByRole } = render(<Component />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(30_000);
//     });
//
//     // Then
//     expect(onTimeOver).toHaveBeenCalled();
//   });
//
//   it('should call callback function when time is updated', () => {
//     // Given
//     const onTimeUpdate = jest.fn();
//     const Component = () => {
//       const { start } = useWorkoutTimer({
//         endTime: 10,
//         initialTime: 0,
//         onTimeUpdate,
//       });
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//         </div>
//       );
//     };
//
//     const { getByRole } = render(<Component />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(10_000);
//     });
//
//     // Then
//     expect(onTimeUpdate).toHaveBeenCalledTimes(11);
//     expect(onTimeUpdate).toHaveBeenNthCalledWith(5, 4);
//     expect(onTimeUpdate).toHaveBeenLastCalledWith(10);
//   });
//
//   it('should call updated callback function when time is updated', () => {
//     // Given
//     const initialOnTimeUpdate = jest.fn();
//     const updatedOnTimeUpdate = jest.fn();
//     const Component: React.FC<Partial<Config>> = ({ onTimeUpdate }) => {
//       const { start } = useWorkoutTimer({
//         endTime: 10,
//         initialTime: 0,
//         onTimeUpdate,
//       });
//
//       return (
//         <div>
//           <button onClick={start}>Start</button>
//         </div>
//       );
//     };
//
//     const { getByRole, rerender } = render(<Component onTimeUpdate={initialOnTimeUpdate} />);
//     rerender(<Component onTimeUpdate={updatedOnTimeUpdate} />);
//
//     // When
//     fireEvent.click(getByRole('button'));
//
//     act(() => {
//       jest.advanceTimersByTime(10_000);
//     });
//
//     // Then
//     expect(initialOnTimeUpdate).toHaveBeenCalledTimes(1);
//     expect(updatedOnTimeUpdate).toHaveBeenCalledTimes(11);
//   });
// });
