import { OrganizationList } from "@clerk/nextjs"

export default function CreateOrganizationpage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id" />
  )
}