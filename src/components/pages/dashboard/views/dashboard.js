import React from 'react';
import Footer from '../footer';
import SideNavBar from '../sidenavbar';
import SimpleLineChart from '../simplelinechart';
import SimpleTable from '../simpletable';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100%',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
})

class Dashboard extends React.Component {
  componentDidMount() {
    
  }

  render() {
    const { classes } = this.props

    return(
      <React.Fragment>
        <div className={classes.root}>
          <SideNavBar/>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Typography variant="h4" gutterBottom component="h2">
              Orders
            </Typography>
            <Typography component="div" className={classes.chartContainer}>
              <SimpleLineChart />
            </Typography>
            <Typography variant="h4" gutterBottom component="h2">
              Products
            </Typography>
            <div className={classes.tableContainer}>
              <SimpleTable />
            </div>
          </main>
        </div>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Dashboard);