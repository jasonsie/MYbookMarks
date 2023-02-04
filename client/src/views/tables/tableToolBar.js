import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useSrcDispatch } from '../../context/tableContext';

export default function EnhancedTableToolbar(props) {
  const { numSelected, action } = props;
  const ActionBtn = ({ type, icon, isOpen }) => (
    <Tooltip title={type}>
      <IconButton onClick={() => action(type)(isOpen)}>{icon}</IconButton>
    </Tooltip>
  );
  const InfoBtn = ({ type, icon, isOpen }) => (
    <Tooltip title={type}>
      <IconButton onClick={() => action('setActionType')(isOpen)(type)}>{icon}</IconButton>
    </Tooltip>
  );

  return (
    <Toolbar
      sx={{
        width: '90%',
        margin: '0 auto',
        p: 3,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} 已選取
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          網路資源
        </Typography>
      )}
      {numSelected > 0 ? (
        numSelected === 1 ? (
          <>
            <InfoBtn type={'edit'} icon={<EditIcon />} isOpen={true} />
            <ActionBtn type={'delete'} icon={<DeleteIcon />} isOpen={false} />
          </>
        ) : (
          <ActionBtn type={'delete'} icon={<DeleteIcon />} isOpen={false} />
        )
      ) : (
        <InfoBtn type={'add'} icon={<AddIcon />} isOpen={true} />
      )}
    </Toolbar>
  );
}
