import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input } from 'reactstrap';
import Label from 'reactstrap/lib/Label';
import * as registerActions from '../../actions/register/register.actions';
import { IRegisterState, IState } from '../../reducers';

interface IProps extends RouteComponentProps<{}>, IRegisterState {
    updateBucketKey: (url: string) => void
    updateEmail: (email: string) => void
    updateError: (message: string) => void
    updateFirstName: (firstName: string) => void
    updateLastName: (lastName: string) => void
    updatePassword: (password: string) => void
    updateUsername: (username: string) => void
    register: (e: React.FormEvent<HTMLFormElement>, credentials: any) => void
}

class RegisterComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }
    public render() {
        const { errorMessage } = this.props;
        return (
            <div className="container h-100">
                <div className="row h-75">
                    <div className="mx-auto my-auto">
                        <Card>
                            <CardHeader className="text-white bg-dark">Create an Account</CardHeader>
                            <CardBody className="bg-light">
                                {errorMessage &&
                                    <div className="alert alert-danger" role="alert">
                                        <span>{errorMessage}</span>
                                    </div>
                                }
                                <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.props.register(e, this.props)}>
                                    <Col>
                                        <FormGroup>
                                            <Label for="inputUsername">Username</Label>
                                            <Input
                                                autoFocus
                                                onChange={(e: any) => this.props.updateUsername(e.target.value)}
                                                value={this.props.username}
                                                type="text"
                                                id="inputUsername"
                                                className="form-control"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="inputPassword">Password</Label>
                                            <Input
                                                onChange={(e: any) => this.props.updatePassword(e.target.value)}
                                                value={this.props.password}
                                                type="password"
                                                id="inputPassword"
                                                className="form-control"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="inputEmail">Email</Label>
                                            <Input
                                                onChange={(e: any) => this.props.updateEmail(e.target.value)}
                                                value={this.props.email}
                                                type="email"
                                                id="inputEmail"
                                                className="form-control"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="inputFirstName">First name</Label>
                                            <Input
                                                onChange={(e: any) => this.props.updateFirstName(e.target.value)}
                                                value={this.props.firstName}
                                                type="text"
                                                id="inputFirstName"
                                                className="form-control"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="inputLastName">Last name</Label>
                                            <Input
                                                onChange={(e: any) => this.props.updateLastName(e.target.value)}
                                                value={this.props.lastName}
                                                type="text"
                                                id="inputLastName"
                                                className="form-control"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Button color="primary" className="btn btn-lg btn-block" type="submit">Register</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.register);
const mapDispatchToProps = {
    register: registerActions.register,
    updateEmail: registerActions.updateEmail,
    updateFirstName: registerActions.updateFirstName,
    updateLastName: registerActions.updateLastName,
    updatePassword: registerActions.updatePassword,
    updateUsername: registerActions.updateUsername,
    updateBucketKey: registerActions.updateBucketKey
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);