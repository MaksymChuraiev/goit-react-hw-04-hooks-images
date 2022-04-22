// import PropTypes from 'prop-types'
// import { Formik } from 'formik';
// import * as Yup from 'yup';
import { useState } from 'react';

import PropTypes from 'prop-types';
import {
  SearchSection,
  SearchForm,
  SearchButton,
  SearchInput,
  SearchSvg,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const onSearchName = e => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);

    setInput('');
  };

  return (
    <SearchSection>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchSvg />
        </SearchButton>
        <SearchInput
          onChange={onSearchName}
          name="name"
          type="text"
          value={input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchSection>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// ============================Formik=========================
// const initialValues = {
//   name: '',
// };

// const validationShema = Yup.object({
//   name: Yup.string().required(),
// });

// export const Searchbar = ({ onSubmit }) => {
//   const handleSubmit = (values, { resetForm }) => {
//     onSubmit(values);
//     resetForm();
//   };

//   return (
//     <SearchSection>
//       <Formik
//         validationSchema={validationShema}
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//       >
//         <SearchForm>
//           <SearchButton type="submit">
//             <SearchSvg />
//           </SearchButton>
//           <SearchInput
//             name="name"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//       </Formik>
//     </SearchSection>
//   );
// };
