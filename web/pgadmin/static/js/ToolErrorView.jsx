import PropTypes from 'prop-types';
import { useEffect } from 'react';
import gettext from 'sources/gettext';
import { styled } from '@mui/material/styles';
import { FormHelperText, Box } from '@mui/material';
import { SafeMessage } from './components/SafeMessage';
import { useApplicationState } from '../../settings/static/ApplicationStateProvider';

const StyledBox = styled(Box)(({theme}) => ({
  color: theme.palette.text.primary,
  margin: '24px auto 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

export default function ToolErrorView({error, panelId, panelDocker}){
  const { deleteToolData } = useApplicationState();
  useEffect(()=>{
    return panelDocker.registerCloser(panelId, async ()=>{
      deleteToolData(panelId);
      return 'close';
    });
  }, [panelId, panelDocker, deleteToolData]);

  let err_msg = gettext('An error occurred while opening the tool: %s', error ?? '');
  return  (<StyledBox>
    <FormHelperText variant="outlined" error={true} style={{marginLeft: '4px'}}><SafeMessage text={err_msg} /></FormHelperText>
  </StyledBox>);
}

ToolErrorView.propTypes = {
  error: PropTypes.string,
  panelId: PropTypes.string,
  panelDocker: PropTypes.object,
};
