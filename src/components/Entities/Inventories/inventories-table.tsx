import useSWR from 'swr'
import { useEffect } from 'react'
import { Location } from '@prisma/client'
import { Column } from 'material-table'
import { Typography } from '@material-ui/core'

import {
  Inventories,
  InventoriesData,
  Inventory,
} from '@Pages/dashboard/inventories'
import { useSnackbarContext } from '@Utils/reducers'
import { Loading } from '@Components/Elements/Loading'
import Table from '@Components/Elements/Table/table'
import { camelCaseToFormal } from '@Utils/common'

type InventoriesTableKey = keyof Inventory | 'tableData'

export function InventoriesTable({ inventories, locations }: InventoriesData) {
  const { toggleSnackbar } = useSnackbarContext()
  const { data, error /* todo: isValidating, revalidate */ } = useSWR<{
    inventories: Inventories
  }>('/api/v1/inventories/all', undefined, {
    initialData: {
      inventories: (Array.isArray(inventories) && inventories) || [],
    },
  })

  useEffect(() => {
    if (error) {
      toggleSnackbar({
        message: error.toString() || 'Oops, there was an error',
        isOpen: true,
        severity: 'error',
      })
    }
  }, [error, toggleSnackbar])

  if (!data || (data && data.inventories && !Array.isArray(data.inventories))) {
    return <Loading />
  }

  const columnData: Array<Column<
    Partial<{ [key in keyof Inventory]: any }>
  >> = Array.from(
    Object.keys(data.inventories[0] as Inventory) as InventoriesTableKey[]
  )
    .filter((key) => key !== 'tableData')
    .map((value) => {
      switch (value) {
        case 'id':
          return {
            title: value.toUpperCase(),
            field: value,
            type: 'numeric',
            disableClick: true,
            editable: 'never',
            readonly: true,
          }
        /**todo refactor duplicates */
        case 'locationId':
          return {
            title: 'LOCATION',
            field: value,
            editable: 'always',
            render: (rowData: Partial<{ locationId: Location[] }>) => (
              <Typography variant={'body2'}>
                {rowData.locationId?.map((loc) => (
                  <span
                    key={loc.id}
                    dangerouslySetInnerHTML={{
                      __html: `${loc.city}, ${loc.state} - ID #${loc.id}`,
                    }}
                  />
                ))}
              </Typography>
            ),
            lookup: locations.reduce((acc, curr) => {
              ;(acc as { [key: number]: string })[
                curr.id
              ] = `${curr.city}, ${curr.state} - ID#${curr.id}`
              return acc
            }, {}),
          }
        default:
          return {
            title: camelCaseToFormal(value).toUpperCase(),
            editable: 'always',
            field: value,
            ...(value !== 'tableData' &&
            value in data.inventories[0] &&
            data.inventories[0][value] &&
            typeof data.inventories[0][value] === 'number'
              ? { type: 'numeric' }
              : {}),
          }
      }
    })

  /**
   * todo editable functions
   */
  return (
    <Table
      editable={{
        onRowAdd: undefined,
        onRowUpdate: undefined,
        onRowDelete: undefined,
      }}
      title={'Inventories'}
      columns={columnData}
      data={(data.inventories as unknown) as Object[]}
      optionsToMerge={{ tableLayout: 'auto' }}
    />
  )
}
