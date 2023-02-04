import React, { useState } from 'react';
import { Input } from '@mui/material';
import { useSrcDispatch } from '../context/tableContext';
import { useSnack } from '../hooks/useSnack';

const EditableInput = (props) => {
  const { row } = props;
  const dispatch = useSrcDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { handleClickVariant } = useSnack();

  function editing(e) {
    e.preventDefault();
    const val = e.target.value;
    try {
      dispatch({
        type: 'changed',
        src: {
          ...row,
          [row['display']]: val,
        },
      });

      setIsEdit(!isEdit);
      if (row[row.display] === val) return;
      handleClickVariant('success')();
    } catch (error) {
      handleClickVariant('error')(error);
    }
  }

  return (
    <>
      {/* <div onDoubleClick={() => setIsEdit(!isEdit)}> */}
      <div>
        {isEdit ? (
          <Input
            sx={{ display: 'block' }}
            defaultValue={row[row.display] ?? ''}
            onBlur={(e) => editing(e)}
          />
        ) : (
          row[row.display] ?? ''
        )}
      </div>
    </>
  );
};

export default EditableInput;
