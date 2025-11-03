import { Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";

const Title = ({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange: (nextValue: string) => void;
}) => {
  const timerIdRef = useRef<number>();
  const onChangeRef = useRef<(nextValue: string) => void>();

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    onChangeRef.current = onChange;
  });
  useEffect(() => () => clearTimeout(timerIdRef.current), []);

  return (
    <div className="flex gap-x-2 items-center">
      <Label htmlFor="title">Title:</Label>
      <TextInput
        id="title"
        name="title"
        value={value}
        onChange={(e) => {
          const nextValue = e.target.value;
          setValue(nextValue);

          clearTimeout(timerIdRef.current);
          timerIdRef.current = setTimeout(
            (val: string) => onChangeRef.current?.(val),
            300,
            nextValue,
          );
        }}
        className="flex-1"
        sizing="sm"
      ></TextInput>
    </div>
  );
};

export default Title;
