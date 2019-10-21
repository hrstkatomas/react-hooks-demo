import React from 'react';
import { mount } from 'enzyme';
import { ThemeContext } from '../context';



// Your custom hook ...
function useThemeContext(): string {
  const theme: string = React.useContext(ThemeContext);
  return theme;
}



// ... Your test ... 
describe('useFormInput test', () => {
  let contextValue: string;
  beforeEach(() => {
    testHook(() => { contextValue = useThemeContext(); }, "darkMode");
  });

  it("should consume theme context", () => {
    expect(contextValue).toBe("darkMode");
  });
});



// ... Hooks testing workaround
interface TestingComonentProps {
  hookCallback: () => void;
}

const TestingComponent = ({ hookCallback }: TestingComonentProps) => {
  hookCallback();
  return null;
};

const testHook = (hookCallback: () => void, themeValue: string) => {
  mount(
    <ThemeContext.Provider value={themeValue}>
      <TestingComponent hookCallback={hookCallback} />
    </ThemeContext.Provider>
  );
};