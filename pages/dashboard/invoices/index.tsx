import { GetServerSideProps } from 'next'

import { DashboardView } from '@Components/Views/dashboard'
import { InvoicesServerSideProps } from '@Types/invoices'
import { InvoicesTable } from '@Components/Entities/Invoices'

function Invoices({ invoices }: { invoices: string }) {
  const invoicesParsed: InvoicesServerSideProps = JSON.parse(invoices)
  return (
    <DashboardView pageTitle={'Invoices'}>
      <InvoicesTable invoices={invoicesParsed} />
    </DashboardView>
  )
}
export const getServerSideProps: GetServerSideProps<{
  invoices: string
}> = async (ctx) => {
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()
  const invoices = await prisma.invoice.findMany({
    include: {
      employee: true,
      customerOrder: true,
      storeLocations: true,
      customer: true,
    },
  })
  return {
    props: { invoices: JSON.stringify(invoices) },
  }
}
export default Invoices
