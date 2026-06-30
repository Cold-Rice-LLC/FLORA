// Custom input for the Process Stages array. Renders the default array input
// but swaps the "array functions" row (the Add item button) for nothing, so the
// fixed 1–4 stage skeleton can't be added to. Items and their modules stay
// fully editable.
const NoArrayFunctions = () => null

export function LockedStagesInput(props) {
  return props.renderDefault({...props, arrayFunctions: NoArrayFunctions})
}
