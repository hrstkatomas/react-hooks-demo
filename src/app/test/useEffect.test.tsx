import React from 'react';
import { mount, ReactWrapper } from 'enzyme';



// Your custom hook ...
function useDocumentTitle(title: string) {
  React.useEffect(() => {
    document.title = title;
    return () => { document.title = "Original title"; };
  })
}



// ... Hooks testing workaround
interface TestingComonentProps {
  hookCallback: () => void;
}

const TestingComponent = ({ hookCallback }: TestingComonentProps) => {
  hookCallback();
  return null;
};

const testHook = (hookCallback: () => void) => {
  return mount(<TestingComponent hookCallback={hookCallback} />);
};



// ... Your test ...
describe('useDocumentTitle test', () => {
  const wrapper: ReactWrapper = testHook(() => {
    useDocumentTitle("Cristiano Ronaldo");
  });

  it("should set document title", () => {
    expect(document.title).toBe("Cristiano Ronaldo");
  });

  it("should return original document title on unmount", () => {
    wrapper.unmount();
    expect(document.title).toBe("Original title");
  });
});


