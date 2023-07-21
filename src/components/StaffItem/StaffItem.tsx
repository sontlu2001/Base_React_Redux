import { useOutletContext, useParams } from 'react-router'

export default function StaffItem() {
  const { id } = useParams()
  const context = useOutletContext()
  console.log(context)
  return <div>StaffItem {id}</div>
}
