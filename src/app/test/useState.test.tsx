import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';



// Your custom hook ...
interface HookReturnValue {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function useFormInput(initialValue: string): HookReturnValue {
  const [value, setValue] = React.useState(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}



// ... Your test ...
describe('useFormInput test', () => {
  // Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
  // 1. You might have mismatching versions of React and the renderer (such as React DOM)
  // 2. You might be breaking the Rules of Hooks
  // 3. You might have more than one copy of React in the same app
  // See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
  // it("this will fail miserably", () => {
  //   const {value, onChange}: HookReturnValue = useFormInput("Cristiano Ronaldo")
  //   expect(value).toBe("Cristiano Ronaldo");
  //   expect(onChange).toBeInstanceOf(Function);
  // });


  let hookValues: HookReturnValue;
  beforeEach(() => {
    testHook(() => {
      hookValues = useFormInput("Cristiano Ronaldo");
    });
  });


  it("should have initial values", () => {
    expect(hookValues.value).toBe("Cristiano Ronaldo");
    expect(hookValues.onChange).toBeInstanceOf(Function);
  });

  it("should set state", () => {
    act(() => {
      hookValues.onChange({ target: { value: "Alexander Ovechkin" } } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(hookValues.value).toBe("Alexander Ovechkin");
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

const testHook = (hookCallback: () => void) => {
  mount(<TestingComponent hookCallback={hookCallback} />);
};