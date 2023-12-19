import { OrgControl } from "./_components/org-control"

export const OrganizationIdLayout = (
  { children }: {
    children: React.ReactNode
  }
) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}

export default OrganizationIdLayout