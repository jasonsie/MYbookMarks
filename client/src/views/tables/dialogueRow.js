import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  MenuItem,
} from '@mui/material';
import { initialRow } from '../../server/static';

const DialogueRow = forwardRef((props, ref) => {
  const { data, sideBar, action, actionType } = props;
  const [row, setRow] = useState(initialRow);
  const [open, setOpen] = useState(false);

  function handleChange(e, type) {
    setRow((pre) => {
      return { ...pre, [type]: e.target.value };
    });
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        getOpen(isOpen) {
          setOpen(isOpen);
        },
      };
    },
    [],
  );

  useEffect(() => {
    setRow(data);
  }, [data]);

  return (
    <Dialog open={open} onClose={() => setOpen(!open)} fullWidth={true} maxWidth="sm">
      <DialogTitle>編輯/新增頁籤</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          label="標題"
          variant="standard"
          margin="normal"
          helperText="Please "
          value={row.name}
          onChange={(e) => handleChange(e, 'name')}
        />
        <TextField
          id="URL"
          label="URL"
          size="small"
          fullWidth
          variant="standard"
          margin="normal"
          value={row.url}
          onChange={(e) => handleChange(e, 'url')}
        />
        <TextField
          id="desc"
          label="描繪"
          multiline
          rows={4}
          variant="standard"
          margin="normal"
          sx={{ marginRight: 10 }}
          value={row.desc}
          onChange={(e) => handleChange(e, 'desc')}
        />
        <TextField
          id="note"
          label="筆記"
          multiline
          rows={4}
          variant="standard"
          margin="normal"
          value={row.note}
          onChange={(e) => handleChange(e, 'note')}
        />
        <TextField
          id="tag"
          label="分類"
          select
          variant="standard"
          sx={{ minWidth: 100 }}
          margin="normal"
          value={row.ctg}
          onChange={(e) => handleChange(e, 'ctg')}
        >
          {sideBar.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)}>取消</Button>
        <Button onClick={() => action(actionType)(false)(row)}>確定</Button>
      </DialogActions>
    </Dialog>
  );
});

export default DialogueRow;
