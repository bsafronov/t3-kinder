import type AsyncSelect from "node_modules/react-select/dist/declarations/src/Async";
import type StateManagedSelect from "node_modules/react-select/dist/declarations/src/stateManager";
import { useMemo } from "react";
import type { ClassNamesConfig, GroupBase, Props } from "react-select";
import ReactSelect from "react-select";
import AsyncReactSelect, { type AsyncProps } from "react-select/async";
import AsyncCreatableSelect, {
  type AsyncCreatableProps,
} from "react-select/async-creatable";
import { cn } from "../utils/cn";

const stylesReactSelect: ClassNamesConfig = {
  container: () => cn("w-full text-sm group"),
  option: ({ isSelected, isFocused }) =>
    cn("px-4 py-2 transition-colors", {
      "bg-slate-300": isSelected,
      "bg-slate-100": isFocused && !isSelected,
    }),

  control: ({ isFocused, isDisabled }) =>
    cn(
      "px-3 py-1 border border-border rounded-md hover:border-slate-300 group bg-white transition-[height] group-[.is-error]:bg-rose-50 group-[.is-error]:border-rose-300",
      {
        "border-slate-300": isFocused,
        "bg-slate-100": isDisabled,
      },
    ),
  menu: () =>
    cn(
      "relative border border-slate-300 rounded-md mt-2 py-2 bg-white overflow-hidden shadow-lg !z-[100]",
    ),
  dropdownIndicator: ({ isFocused }) =>
    cn("text-slate-300  transition-colors", {
      "text-slate-500": isFocused,
      // "text-red-500": ,
    }),
  placeholder: () => cn("text-slate-500 font-normal text-sm"),
  menuList: () => cn("divide-y divide-slate-200"),
  valueContainer: () => cn("flex gap-1"),
  multiValue: () =>
    cn(
      "rounded-sm text-sm gap-1 bg-slate-200 overflow-hidden truncate max-w-[16rem]",
    ),
  multiValueLabel: () => cn("px-2 py-0.5"),
  multiValueRemove: () =>
    cn(
      "px-1 hover:bg-red-500 hover:text-white border-l border-slate-300 text-slate-500 transition-colors",
    ),
  indicatorsContainer: () => cn("text-slate-400 cursor-pointer"),
  indicatorSeparator: () => cn("bg-slate-200 mx-2"),
  clearIndicator: () => cn(""),
};

type CustomProps<O, M extends boolean, G extends GroupBase<O>> = {
  selectType: "sync" | "async" | "async-creatable";
} & (
  | ({
      selectType: "sync";
    } & Props<O, M, G>)
  | ({
      selectType: "async";
    } & AsyncProps<O, M, G>)
  | ({
      selectType: "async-creatable";
    } & AsyncCreatableProps<O, M, G>)
);

export default function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: CustomProps<Option, IsMulti, Group>) {
  let Component: StateManagedSelect | AsyncSelect;
  let loadOptions;

  const {
    selectType,
    closeMenuOnSelect = false,
    blurInputOnSelect,
    classNames,
    isMulti,
    ...rest
  } = props;

  if (selectType === "async") {
    Component = AsyncReactSelect;
    loadOptions = props.loadOptions;
  } else if (selectType === "async-creatable") {
    Component = AsyncCreatableSelect;
    loadOptions = props.loadOptions;
  } else {
    Component = ReactSelect;
  }

  const mergedStyles = useMemo(() => {
    /* eslint-disable */

    const initialStyles: Record<string, (data: any) => string> = {
      ...stylesReactSelect,
    };

    Object.entries({ ...classNames }).forEach(([key, value]) => {
      if (typeof value === "function") {
        const defaultStyle = initialStyles[key] ?? (() => "");
        initialStyles[key] = (...args) =>
          cn(defaultStyle(...args), value(...args));
      }
    });
    /* eslint-enable */
    return initialStyles;
  }, [classNames]);

  return (
    <Component
      {...rest}
      isMulti={isMulti}
      loadOptions={loadOptions}
      closeMenuOnSelect={!isMulti ?? closeMenuOnSelect}
      blurInputOnSelect={!isMulti ?? blurInputOnSelect ?? closeMenuOnSelect}
      placeholder="Выбрать..."
      loadingMessage={() => "Поиск..."}
      noOptionsMessage={() => "Не найдено..."}
      unstyled
      classNames={mergedStyles}
    />
  );
}
