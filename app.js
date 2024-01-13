blob = document.querySelector(".blob");
col = document.querySelectorAll('.col');
function changeAnim(e)
{
    //blob.setAttribute('style','animation: splitx 1s linear infinite')
}
col.forEach(e => {
    e.addEventListener('click',changeAnim(this))
});