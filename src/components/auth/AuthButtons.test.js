import {render,screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { SWRConfig } from 'swr'
import { createServer } from '../../tests/server'
import AuthButtons from './AuthButtons'


async function renderComponent(){
     render(<SWRConfig value={{provider:()=>new Map()}}> <MemoryRouter><AuthButtons/></MemoryRouter></SWRConfig>)
     await screen.findAllByRole('link')
}
describe('when user is not signed in ',()=>{
    createServer([{path:'/api/user',
    res:()=>{
        return {user:null}
     }}])

    test('sign in and sign up visible',async()=>{
       await  renderComponent()
     const signinbutton=screen.getByRole('link',{
        name:/sign in/i
     })
     const signUpButton=screen.getByRole('link',{
        name:/sign up/i
     })
     expect(signinbutton).toBeInTheDocument()
     expect(signinbutton).toHaveAttribute('href','/signin')
     expect(signUpButton).toBeInTheDocument()
     expect(signUpButton).toHaveAttribute('href','/signup')
        console.log('test 2')
    })
    test('sign out is not visible',async()=>{
       await renderComponent()
        console.log('test 1')
    const signOutButton=screen.queryByRole('link',{name:/sign out/i})
    expect(signOutButton).not.toBeInTheDocument()
    })
})

describe('when user is signed in',()=>{
    createServer([{path:'/api/user',
    res:()=>{
        return {user:{id:'12',email:'ibsbhinder54@gmail.com'}}
     }}])


    test('sign in and sign up are not visible',async()=>{
      await  renderComponent()
        console.log('test 3')
        const signInButton=screen.queryByRole('link',{name:/sign in/i})
        const signOutButton=screen.queryByRole('link',{name:/sign up/i})
        expect(signInButton).not.toBeInTheDocument()
        expect(signOutButton).not.toBeInTheDocument()
    })
    test('sign out is  visible',async()=>{
       await renderComponent()
        console.log('test 4')
        const signOutButton=screen.getByRole('link',{
            name:/sign out/i
         })
        expect(signOutButton).toBeInTheDocument()
    
    })

})
