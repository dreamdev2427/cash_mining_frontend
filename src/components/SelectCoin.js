import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import { styled } from '@mui/system';
import { PopperUnstyled } from '@mui/base';

const StyledButton = styled('button')(
  ({ theme }) => `
  // width: 190px;
  text-align: center;
  // padding-top: 10px;
  // padding: 17px;
  // margin-left: 6%;
  text-shadow: 3px 2px 3px rgb(0 0 0 / 78%);
  border-radius: 5px;
  border-style:none;
  font-family: 'Roboto',sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: white;
  line-height: 1;
  background-color: transparent;
  // background-image: linear-gradient(90deg, hsla(37, 100%, 50%, 0.75) 0%, hsla(48, 97%, 55%, 0.75) 100%);
  color: theme.palette.text.primary;
  //@media only screen and (max-width: 767px) {
  // display: none; 
  //}

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
      color: white;
    }
  }

  &::after {
    content: '▾';
    float: right;
    color: white;
  }

  & img {
    margin-right: 10px;
  }
  `,
);

const SmallScreenStyledButton = styled('button')(
  ({ theme }) => `
  display: none;
  z-Index: 2;
  border-style: none;
  text-shadow: 3px 2px 3px rgb(0 0 0 / 78%);
  text-align: center;
  width: 45%;
  margin-top: 20px;
  border-radius: 4px;
  background-color: #d8a909;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Roboto',sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: white;
  line-height: 1.75;
  background-image: linear-gradient(90deg, hsla(37, 100%, 50%, 0.75) 0%, hsla(48, 97%, 55%, 0.75) 100%);
  color: theme.palette.text.primary;
  @media only screen and (max-width: 767px) {
    display: block;
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
      color: white;
    }
  }

  &::after {
    content: '▾';
    float: right;
    color: white;
  }

  & img {
    margin-right: 10px;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 106px;
  max-height: 200px;
  background: #2e2f31;
  border-radius: 0.75em;
  color: white;
  overflow: auto;
  outline: 0px;
  text-align: left;
  z-index: 2;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  background: #2e2f31;
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;
  z-index: 2;
  &:hover {
    background: #3b3c3e;
  }
  &:last-of-type {
    border-bottom: none;
  }
  & img {
    margin-right: 10px;
  }`,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 2;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: props.responsive? StyledButton : SmallScreenStyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

export default function UnstyledSelectRichOptions({ value, onChange, responsive = true, disabled = false }) {
  return (
    <CustomSelect defaultValue={0} value={value} onChange={onChange} disabled={disabled} responsive={responsive}>
      {coins.map((c) => (
        <StyledOption key={c.code} value={c.code}>
          <img
            loading="lazy"
            width="20"
            src={`/img/flags/${c.code.toLowerCase()}.png`}
            alt={`Coin of ${c.label}`}
          />
          {c.label}
        </StyledOption>
      ))}
    </CustomSelect>
  );
}

const coins = [
  { code: 'en', label: 'ENG' },
  { code: 'fr', label: 'FRA' },
  { code: 'sp', label: 'ESP' },
  { code: 'ru', label: 'PYC' },
  { code: 'ch', label: '中国人' },
];

