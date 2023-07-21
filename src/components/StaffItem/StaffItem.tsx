import { useParams } from 'react-router'

export default function StaffItem() {
  const { id } = useParams()
  return <div>StaffItem {id}</div>
}
