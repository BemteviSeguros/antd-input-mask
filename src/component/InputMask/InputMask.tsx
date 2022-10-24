import React, { useEffect, useState, FC } from "react";
import { Input } from "antd";

import { InputMaskProps } from "./InputMask.types";

const InputMask: FC<InputMaskProps> = (props) => {
  const {
    mask,
    rightToLeft,
    setFieldValue,
    setMaskedFieldValue,
    prefix = "",
    initialValue,
    onlyNumbers,
    ...otherProps
  } = props;

  const [maskedValue, setMaskedValue] = useState("");
  const [maskPair, setMaskPair] = useState([{ index: 0, char: "-" }]);

  const isCharSpecial = (char: string) => {
    if (!char) return false;

    const charUnicodeValue = char.charCodeAt(0);

    // check if current char is not a number/letter
    return !(
      (charUnicodeValue >= 48 && charUnicodeValue <= 57) ||
      (charUnicodeValue >= 65 && charUnicodeValue <= 90) ||
      (charUnicodeValue >= 97 && charUnicodeValue <= 122)
    );
  };

  const maskInput = (auxMaskedValue: Array<string>) => {
    if (rightToLeft) {
      for (let i = auxMaskedValue.length - 1; i >= 0; i -= 1) {
        const invertedIndex = auxMaskedValue.length - 1 - i;
        const indexToMask = maskPair.findIndex(
          (item: any) => item.index === invertedIndex
        );
        if (indexToMask !== -1 && !isCharSpecial(auxMaskedValue[i])) {
          auxMaskedValue.splice(i + 1, 0, maskPair[indexToMask].char);
        }
      }
    } else {
      for (let i = 0; i < auxMaskedValue.length; i += 1) {
        const indexToMask = maskPair.findIndex((item: any) => item.index === i);
        if (indexToMask !== -1 && !isCharSpecial(auxMaskedValue[i])) {
          auxMaskedValue.splice(i, 0, maskPair[indexToMask].char);
        }
      }
    }
  };

  useEffect(() => {
    const maskPairAux: Array<{ index: number; char: string }> = [];
    for (let i = 0; i < mask.length; i += 1) {
      if (isCharSpecial(mask[i])) {
        maskPairAux.push({
          index: rightToLeft ? mask.length - 1 - i : i,
          char: mask[i],
        });
      }
    }
    setMaskPair(maskPairAux);
  }, [mask]);

  useEffect(() => {
    if (!maskedValue && initialValue?.value && initialValue.value !== "NaN") {
      const auxInitialValue = `${initialValue.value}`;
      const auxMaskedValue = initialValue?.normalize
        ? initialValue.normalize(auxInitialValue).split("")
        : auxInitialValue.split("");
      maskInput(auxMaskedValue);
      setMaskedValue(auxMaskedValue.join(""));
    }
  }, [initialValue]);

  const handleChange = (e: any) => {
    let incomeValue = e.target.value;
    const prefixCharsArray = prefix.split("");
    prefixCharsArray.forEach((char: string) => {
      incomeValue = incomeValue.replaceAll(char, "");
    });
    const incomeValueLength = incomeValue.length;

    if (
      incomeValueLength > mask.length ||
      (onlyNumbers &&
        !incomeValue[incomeValueLength - 1]?.match(/^[0-9]*$/g) &&
        incomeValue &&
        incomeValue >= maskedValue)
    ) {
      return;
    }

    const auxValue = incomeValue.split("");
    for (let i = 0; i < auxValue.length; i += 1) {
      if (isCharSpecial(auxValue[i])) {
        auxValue.splice(i, 1);
      }
    }
    if (setFieldValue) setFieldValue(auxValue.join(""));

    maskInput(auxValue);
    setMaskedValue(auxValue.join(""));
    if (setMaskedFieldValue) setMaskedFieldValue(auxValue.join(""));
  };
  return (
    <Input
      onChange={handleChange}
      value={prefix + maskedValue}
      {...otherProps}
    />
  );
};

export default InputMask;
