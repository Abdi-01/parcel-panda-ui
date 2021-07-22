import styled from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";

export const LargeAvatar = styled.img`
    width: 200px;
    height: 200px;
    display: inline-block;
`

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 15px;
    margin: 15px 0;
`

export const ProfileWrapper = styled.div`
    display: grid;
    grid-template-areas: "form pict";
    margin: 15px 0;

    @media screen and (max-width: 768px) {
        grid-template-areas: 'pict' 'form';
    }
`

export const ProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    border-bottom: 2px solid #efefef;
`

export const EditContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 5px 0;
`

export const PictContainer = styled.div`
    grid-area: pict;
    justify-self: stretch;
    align-self: center;
    padding: 15px;
    text-align: center;
`

export const Form = styled.form`
    grid-area: form;
    justify-self: stretch;
    align-self: center;
    padding: 15px;
    border-right: 2px solid #efefef;
    @media screen and (max-width: 768px) {
        border-right: none;
        justify-self: center;
    }
`

export const Label = styled(FormLabel)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
    text-align: right;
    margin-right: 20px;
`

export const Status = styled.span`
    color: rgb(66, 181, 73);
    background-color: rgb(218, 245, 219);
    border-radius: 3px; 
    align-items: center;
    margin: 0 5px;
    padding: 0 10px;
    font-style: italic;
    font-size: 12px;
    font-weight: 700;
`

export const Input = styled.input`
    display: none;
`

export const StyledButton = styled(Button)`
    background-color: #fff8ea;
    color: #FAB629;

    &:hover {
        background-color: #fef0d4;
    }
`