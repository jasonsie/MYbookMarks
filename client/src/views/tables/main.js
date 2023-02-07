import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Paper,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Link,
  Checkbox,
  Chip,
} from '@mui/material';
import { initialRow, titles } from '../../server/static';
import EditableInput from '../../components/editableInput';
import EnhancedTableToolbar from './tableToolBar';
import DialogueRow from './dialogueRow';
import { createBookMark, editBookMark, deleteBookMark } from '../../utilis/useApi';
import { useSrcDispatch } from '../../context/tableContext';
import { setDel, setEdit } from '../../utilis/useFunction';

const cellStyle = {
  small: {
    cursor: 'pointer',
    minWidth: 50,
    maxWidth: 50,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderStyle: 'border-box',
  },
  medium: {
    cursor: 'pointer',
    maxWidth: 120,
    minWidth: 100,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderStyle: 'border-box',
  },
  titleCss: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
  large: {
    cursor: 'pointer',
    maxWidth: 240,
    minWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderStyle: 'border-box',
  },
  chip: {
    margin: ' 1px',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    fontSize: ' 1rem',
  },
  title: {
    // fontSize: ' 1.2rem',
    // fontWeight: 'bold',
    // letterSpacing: '0.5em',
  },
  text: {
    fontSize: ' 0.9rem',
    letterSpacing: '0.1em',
    lineHeight: '1.8',
  },
};

const Main = forwardRef((props, ref) => {
  const { rows: rowsData, sideBar } = props;
  const dispatch = useSrcDispatch();
  const [rows, setRows] = useState(rowsData);
  const [selectedLs, setSelectedLs] = useState([]);
  const [actionType, setActionType] = useState('');
  const dialogueRef = useRef(null);

  function handleTables(e, row) {
    if (e.target.href) return;
    const isSelected = selectedLs.some((each) => each.id === row.id);
    isSelected
      ? setSelectedLs((pre) => pre.filter((each) => each.id !== row.id))
      : setSelectedLs((pre) => [...pre, row]);
  }

  function handleAct(type) {
    return (isOpen = true) => {
      dialogueRef.current.getOpen(isOpen);
      switch (type) {
        case 'setActionType':
          return (data = '') => {
            setActionType(data);
          };
        case 'delete':
          let { updateData: updateRows } = setDel(selectedLs)(rows);
          // api
          deleteBookMark(selectedLs);
          // screen
          setSelectedLs([]);
          setRows(updateRows);
          // context
          dispatch({
            type: 'delete',
            selectedLs: selectedLs,
          });
          break;
        case 'edit':
          return (editItem = {}) => {
            let { updateRows } = setEdit(editItem)(rows);
            console.log(`editItem`, editItem);
            // api
            editBookMark(editItem);
            // context
            dispatch({
              type: 'edit',
              editItem: editItem,
            });
            // screen : back to the init
            setSelectedLs([]);
            setActionType('');
          };
        case 'add':
          return (addItem = {}) => {
            // api
            const resPromise = createBookMark(addItem);
            resPromise
              .then((res) => {
                const { data: newBookMarks } = res;
                // context
                dispatch({
                  type: 'add',
                  addItem: newBookMarks,
                });
              })
              .catch((err) => console.log(err));
            // screen : back to the init
            setSelectedLs([]);
            setActionType('');
          };
        default:
          break;
      }
    };
  }

  useEffect(() => {
    setRows(rowsData);
  }, [rowsData]);

  useImperativeHandle(
    ref,
    () => {
      return {
        init() {
          setSelectedLs([]);
        },
      };
    },
    [],
  );

  return (
    <>
      <EnhancedTableToolbar numSelected={selectedLs.length} action={handleAct} />
      <TableContainer component={Paper} sx={{ width: '90%', margin: '0 auto' }}>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={cellStyle['small']}>
                <Checkbox
                  color="primary"
                  checked={rows.length > 0 && selectedLs.length === rows.length}
                  indeterminate={selectedLs.length > 0 && selectedLs.length < rows.length}
                  onChange={() =>
                    selectedLs.length === rows.length ? setSelectedLs([]) : setSelectedLs(rows)
                  }
                />
              </TableCell>
              {titles.map((each) => (
                <TableCell
                  align="left"
                  sx={{ ...cellStyle[each.style], ...cellStyle['title'] }}
                  key={each.id}
                >
                  {each.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover onClick={(e) => handleTables(e, row)}>
                <TableCell padding="checkbox" sx={cellStyle['small']}>
                  <Checkbox
                    color="primary"
                    checked={selectedLs.some((each) => each.id === row.id)}
                  />
                </TableCell>
                <TableCell align="left" sx={cellStyle['medium']}>
                  <Box sx={cellStyle['titleCss']}>
                    <img
                      height="18"
                      width="18"
                      src={`http://www.google.com/s2/favicons?domain=${row.url}`}
                    />
                    <Link href={row.url} sx={cellStyle['link']} target="_blank">
                      {row.name}
                    </Link>
                  </Box>
                </TableCell>
                <TableCell align="left" sx={{ ...cellStyle['large'], ...cellStyle['text'] }}>
                  <EditableInput row={{ ...row, display: 'desc' }} />
                </TableCell>
                <TableCell align="left" sx={{ ...cellStyle['medium'], ...cellStyle['text'] }}>
                  <EditableInput row={{ ...row, display: 'note' }} />
                </TableCell>
                <TableCell align="left" sx={cellStyle['small']}>
                  {row?.ctg.map((each) => (
                    <Chip
                      size="medium"
                      label={each}
                      color="info"
                      key={each}
                      sx={cellStyle['chip']}
                    />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogueRow
        data={selectedLs[0] ?? initialRow}
        sideBar={sideBar}
        ref={dialogueRef}
        action={handleAct}
        actionType={actionType}
      />
    </>
  );
});

export default Main;
