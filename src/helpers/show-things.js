import { useSelector } from "react-redux"
export function useShowThings() {
  const hideThings = useSelector(s => s?.Settings?.settings?.hideThings)

  const showThings = {}
  hideThings?.forEach(item => (showThings[item.type] = item.value))
  return showThings
}
