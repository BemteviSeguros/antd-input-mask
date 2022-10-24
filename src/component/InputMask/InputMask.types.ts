import { InputProps } from "antd";

export interface IInitalValue {
  value: string | number;
  normalize?: (value: string) => string;
}

export interface InputMaskProps extends InputProps {
  setMaskedFieldValue?: (value: string) => void;
  setFieldValue?: (value: string) => void;
  mask: string;
  rightToLeft?: boolean;
  prefix?: string;
  initialValue?: IInitalValue;
  onlyNumbers?: boolean;
}
