import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import ProfileBox from "../../components/profileBox";
import AddressBox from "../../components/addressBox";
import PasswordBox from "../../components/passwordBox";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useTheme } from "@material-ui/core/styles";
import { Container } from "react-bootstrap";
import { 
  AppBar, 
  Box,
  Tab,
  Tabs,
  Typography 
} from "@material-ui/core/";


// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const UserProfile = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Container>
        <Box sx={{ bgcolor: 'background.paper' }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              aria-label="full width tabs example"
            >
              <Tab label="Profile" {...a11yProps(0)} />
              <Tab label="Address" {...a11yProps(1)} />
              <Tab label="Password" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction} sx={{ px: 0 }}>
              <ProfileBox />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <AddressBox />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <PasswordBox />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Container>
    </div>
  );
};

export default UserProfile;
