//responsible for coordinating when the length of the title bar changes, so it will displace the bottom bars positioning respectively
new MutationObserver((mutations) => {
	mutations.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(addedNode) {
			//looking for steamdesktop_OuterFrame_3mz8w which is the parent of titlebarcontrols_TitleBarControls_
			if (addedNode.classList && addedNode.classList.contains('_3mz8wQ6Q44B8P7pzPP4Iyw')) {
				const title_bar_controls = document.querySelector('._3cykd-VfN_xBxf3Qxriccm')
				const bottom_bar_controls = document.querySelector('._3vCzSrrXZzZjVJFZNg9SGu')
				//fires `changeOffset` before adding mutationobs
				changeOffset(bottom_bar_controls, getVisibleControlsWidth(title_bar_controls))
				//titlebar observer
				new MutationObserver((mutationsList) => {
					for (const _ of mutationsList) {
						//every time the titlebar changes, update the offset of the bottombars positioning (they are exactly relative)
						changeOffset(bottom_bar_controls, getVisibleControlsWidth(title_bar_controls))
					}
				//listen for mutations on the titlebar, but we dont listen for anything in specific, just changes
				}).observe(title_bar_controls, { attributes: true, childList: true, subtree: true, characterData: true });
			}
		});
	});
//create an observer on the document body so you can read new DOM modifications. 
//used to tell when titlebar contents have loaded
}).observe(document.body, { childList: true, subtree: true });

function getVisibleControlsWidth(titleBarControls) {
	const controls = titleBarControls.querySelectorAll('._5wILZhsLODVwGfcJ0hKmJ, ._3mGEzzp18imtSzGPkduedi, ._3yD46y5pd3zOGR7CzKs0mC');
	const firstVisibleControl = Array.from(controls).find(control => control.getClientRects().length > 0);

	return firstVisibleControl
		? titleBarControls.getBoundingClientRect().right - firstVisibleControl.getBoundingClientRect().left
		: titleBarControls.offsetWidth;
}

function changeOffset(bottom, offsetWidth) {
	let offset = 0;
	if(getComputedStyle(document.querySelector("._1-9sir4j_KQiMqdkZjQN0u")).right != "0px") offset = 90;
	bottom.style.setProperty('right', `${offsetWidth + offset}px`, 'important')
};
