import { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { motion, Variants } from 'framer-motion'
import { createStyles } from '@material-ui/styles'
import { Box, Button, Grid, Paper, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AddCircleOutline, SearchOutlined } from '@material-ui/icons'

import { CustomerLookupForm } from '@Components/Forms'
import CustomerCreateUpdateForm from '@Components/Forms/sales/customer-create-update'

import { RootStateType } from '@Store/modules/types'

type CustomerSale = ReturnType<typeof mapStateToProps>

const MotionGrid = motion.custom(Grid)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: 'secondary',
      width: '100%',
    },
    title: {
      margin: '1rem 0',
    },
    customerInfoForm: {
      margin: '2rem auto',
      color: theme.palette.text.primary,
      padding: 0,
      boxShadow: theme.shadows['3'],
    },
    formTitle: {
      margin: '0.72rem 1.3rem',
    },
    paper: {
      margin: '0',
      height: '100%',
      flexGrow: 1,
      minHeight: '350px',
    },
  })
)

/**
 * TODO if this was real, i'd say to check for auth here too with user role, but its not and its due tomorrow so im gonna stop and get this done
 * initially show a customer lookup autocomplete input,
 * but switch to create customer if employee has to create one (ie not found in lookup)
 * @param customerOrderState
 * @constructor
 */
function CustomerInfo({ customerOrderState }: CustomerSale) {
  const classes = useStyles()
  // the create update form allows the user to create or update a customer's info
  const [isCreateUpdateFormHidden, setCreateUpdateFormHidden] = useState(true)

  // if the user is creating a new customer
  const [isCreating, setIsCreating] = useState(false)
  // if updating an existing customer's info
  const [isUpdating, setIsUpdating] = useState(false)

  const hiddenVariants: Variants = {
    hidden: {
      opacity: 0,
      scaleX: 1,
      scaleY: 0,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: {
        ease: 'anticipate',
        duration: 0.3,
        mass: 200,
      },
    },
  }

  const { customerId } = customerOrderState || {}

  // ok so lets explain:
  // 1. customer search form dispatches a customerId to state
  // 2. so the user should be updating then
  // 3. if user clears the search field, then set updating to false
  // 4. also puts customerId into form on load if moving back from next step in wizard
  useEffect(() => {
    // chosen id in state, so updating the chosen id
    if (customerId) {
      setCreateUpdateFormHidden(false)
      setIsUpdating(true)
    } else {
      setIsUpdating(false)
    }
  }, [customerId])

  // only set creating or updating to true
  useEffect(() => {
    if (isCreating) setIsUpdating(false)
  }, [isCreating])

  // if clicking add new, set the form visible to enter data
  const onAddNewClick = useCallback(() => {
    setCreateUpdateFormHidden(false)
    setIsCreating(true)
  }, [])

  return (
    <>
      <Box component={'section'} className={classes.root}>
        <Grid container justify={'flex-start'} spacing={2}>
          <Grid className={classes.title} item md>
            <Typography variant={'h2'} align={'left'}>
              Customer Info
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          wrap={'wrap'}
          spacing={1}
          alignItems={'center'}
          justify={'space-around'}
        >
          <Grid item xs>
            <CustomerLookupForm isDisabled={isCreating} />
          </Grid>
          <Grid item xs>
            <Button
              type={'button'}
              component={'button'}
              variant={'outlined'}
              /* if user is creating, show option to search  **/
              endIcon={isCreating ? <SearchOutlined /> : <AddCircleOutline />}
              title={'add new customer'}
              /* if user is creating, on click, set creating to false so they can search **/
              onClick={isCreating ? () => setIsCreating(false) : onAddNewClick}
            >
              {isCreating ? 'Search' : 'Create new'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <MotionGrid
        className={classes.customerInfoForm}
        container
        justify={'center'}
        alignItems={'stretch'}
        initial={'hidden'}
        variants={hiddenVariants}
        animate={isCreateUpdateFormHidden ? 'hidden' : 'visible'}
      >
        <Paper component={'section'} elevation={3} className={classes.paper}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant={'body1'}
              className={classes.formTitle}
            >
              {isCreating
                ? 'Create'
                : !!customerId && 'Please verify information is correct'}
            </Typography>
            <CustomerCreateUpdateForm
              isUpdating={isUpdating}
              isCreating={isCreating}
              isHidden={isCreateUpdateFormHidden}
            />
          </Grid>
        </Paper>
      </MotionGrid>
    </>
  )
}

const mapStateToProps = (state: RootStateType) => {
  return {
    customerOrderState: state.customerOrderReducer,
  }
}
export default connect(mapStateToProps)(CustomerInfo)