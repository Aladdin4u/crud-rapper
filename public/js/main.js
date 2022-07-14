const deleteText = document.querySelectorAll('.delete');
const updateText = document.querySelectorAll('.update');

Array.from(deleteText).forEach(element => {
    element.addEventListener('click', deleteRapper)
})

Array.from(updateText).forEach(element => {
    element.addEventListener('click', updateRapper)
})

async function deleteRapper() {
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                'stageName': sName,
                'birthName': bName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err) {
        console.log(err)
    }
}

async function updateRapper() {
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addNewRapper', {
            method: 'put',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                'stageName': sName,
                'birthName': bName,
                'likes': tLikes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err) {
        console.log(err)
    }
}