import { screen,render,act } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import RepositoriesListItem from './RepositoriesListItem'
const data={full_name:'inderbir', language:'JavaScript', description:"dedo kuch bhi", owner:"inderbur", name:"inder",html_url:'test'} 
test('testing react route',()=>{
    
render(<MemoryRouter><RepositoriesListItem repository={data}/></MemoryRouter>)
expect(screen.getByText('inder')).toBeInTheDocument()
})

test("get link",async()=>{
    render(<MemoryRouter><RepositoriesListItem repository={data}/></MemoryRouter>)
    const url=await screen.findByRole('link',{name:/git repo/i})
    expect(url).toHaveAttribute('href',data.html_url)

})
function renderComponent(){
    render(<MemoryRouter><RepositoriesListItem repository={data}/></MemoryRouter>)
}
test("check icon is there",async ()=>{
  renderComponent()
    const link=await screen.findByRole('img',{name:'JavaScript'})
    expect(link).toHaveClass('js-icon')

})