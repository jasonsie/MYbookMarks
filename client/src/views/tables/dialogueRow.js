import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Autocomplete,
  Chip,
  createFilterOptions,
  InputAdornment,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { initialRow } from '../../server/static';
import { askAI } from '../../utilis/useApi';
const filter = createFilterOptions();

const style = {
  title: {
    fontSize: ' 1.2rem',
    fontWeight: 'bold',
    letterSpacing: '0.5em',
    margin: 0.5,
  },
};

const DialogueRow = forwardRef((props, ref) => {
  const { data, sideBar, action, actionType } = props;
  const [row, setRow] = useState(initialRow);
  const [open, setOpen] = useState(false);
  const [batch, setBatch] = useState(false);
  // const [sideBar, setSideBar] = useState([]);

  function handleChange(e, type) {
    setRow((pre) => {
      return { ...pre, [type]: e.target.value };
    });
  }

  async function handleBatch() {
    setBatch(!batch);
    const { data: AISays, status } = await askAI(row?.url);
    try {
      if (status === 200) {
        const title = AISays.match(/Title:(.*)/);
        const summary = AISays.match(/Summary:(.*)/)[1];
        setRow((pre) => {
          return { ...pre, name: title[1] ?? pre.name, desc: summary ?? pre.desc };
        });
        setBatch(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const BatchingIcon = () =>
    batch ? (
      <CircularProgress size={15} />
    ) : (
      <IconButton aria-label="bot" onClick={() => handleBatch()}>
        <SmartToyIcon />
      </IconButton>
    );

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
      <DialogTitle sx={style['title']}>編輯 / 新增頁籤</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          label="標題"
          variant="standard"
          margin="normal"
          helperText="Please "
          value={row?.name}
          onChange={(e) => handleChange(e, 'name')}
        />
        <TextField
          id="URL"
          label="URL"
          size="small"
          fullWidth
          variant="standard"
          margin="normal"
          value={row?.url}
          onChange={(e) => handleChange(e, 'url')}
        />
        <TextField
          id="desc"
          label="描述"
          multiline
          rows={6}
          variant="standard"
          margin="normal"
          sx={{ marginRight: 10 }}
          value={row?.desc}
          onChange={(e) => handleChange(e, 'desc')}
          InputProps={{
            endAdornment: <BatchingIcon />,
          }}
        />
        <TextField
          id="note"
          label="筆記"
          multiline
          rows={6}
          variant="standard"
          margin="normal"
          value={row?.note}
          onChange={(e) => handleChange(e, 'note')}
        />
        <Autocomplete
          id="ctg"
          sx={{ maxWidth: '60%', marginTop: 5 }}
          size="small"
          multiple
          disableCloseOnSelect
          freeSolo
          selectOnFocus
          clearOnBlur
          defaultValue={row.ctg ?? null}
          options={sideBar.map((side) => side.name)}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => option === inputValue);
            if (inputValue !== '' && !isExisting) filtered.push(inputValue);
            return filtered;
          }}
          getOptionLabel={(option) => option}
          renderTags={(value, getTagProps) => {
            return (
              value[0] !== undefined &&
              value?.map((option, index) => (
                <Chip variant="outlined" color="info" label={option} {...getTagProps({ index })} />
              ))
            );
          }}
          renderInput={(params) => <TextField {...params} label="分類" placeholder="選擇分類" />}
          onChange={(e, val) =>
            setRow((pre) => {
              return { ...pre, ctg: val[0] === undefined ? ['Uncategoried'] : val };
            })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)}>取消</Button>
        <Button onClick={() => action(actionType)(false)(row)}>確定</Button>
      </DialogActions>
    </Dialog>
  );
});

export default DialogueRow;
