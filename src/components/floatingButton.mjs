const updateFloatingButtonPosition = (floatingButton) => {
  const FLOATING_BUTTON_GAP_PX = 12

  if (!floatingButton) {
    return
  }

  const visualViewport = window.visualViewport
  if (!visualViewport) {
    floatingButton.style.bottom = `${FLOATING_BUTTON_GAP_PX}px`
    floatingButton.style.right = `${FLOATING_BUTTON_GAP_PX}px`
    return
  }

  const viewportBottomOffset = Math.max(
    FLOATING_BUTTON_GAP_PX,
    window.innerHeight
      - (visualViewport.height + visualViewport.offsetTop)
      + FLOATING_BUTTON_GAP_PX,
  )
  const viewportRightOffset = Math.max(
    FLOATING_BUTTON_GAP_PX,
    window.innerWidth
      - (visualViewport.width + visualViewport.offsetLeft)
      + FLOATING_BUTTON_GAP_PX,
  )


  floatingButton.style.bottom = `${viewportBottomOffset}px`
  floatingButton.style.right = `${viewportRightOffset}px`
}

export default updateFloatingButtonPosition;