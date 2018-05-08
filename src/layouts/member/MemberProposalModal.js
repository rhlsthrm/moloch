import React, { Component } from 'react'
import { 
    Modal, Button, Form, Input, Label
} from 'semantic-ui-react'

class MemberProposalModal extends Component {
    state = {
        propspectiveMemberAddress: null,
        tokenTributeAddresses: null, // array of addresses
        tokenTributeAmounts: null, // array of tribute
        votingSharesRequested: null,
    }

    handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        this.setState({ [name]: value })
    }

    validate = () => {
        // TO DO: client side error validation
        return true
    }

    handleSubmit = () => {
        // const {
        //     propspectiveMemberAddress,
        //     tokenTributeAddresses,
        //     tokenTributeAmounts,
        //     votingSharesRequested
        // } = this.state
        if (this.validate()) {
            // add member proposal to queue
            console.log(this.state)
        }
    }

    render = () => {
        return (
            <Modal
            size='small'
            trigger={<Button basic>New Member Proposal</Button>}
            style={{ position: 'absolute', top: '50%', left: '25%' }}
            >
                <Modal.Header>Submit New Guild Member Proposal</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Label>Member Address</Label>
                            <Input
                                type='text'
                                name='propspectiveMemberAddress'
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>Token Tribute Addresses (csv)</Label>
                            <Input
                                type='text'
                                name='tokenTributeAddresses'
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>Token Tribute Amounts (csv)</Label>
                            <Input
                                type='text'
                                name='tokenTributeAmounts'
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Label>Requested Voting Shares</Label>
                            <Input
                                type='number'
                                name='votingSharesRequested'
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                        <Button basic onClick={this.handleSubmit}>Submit</Button>

                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default MemberProposalModal
