import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input } from 'reactstrap';
import * as signInActions from '../../actions/sign-in/sign-in.actions';
import { ISignInState, IState } from '../../reducers';

interface IProps extends RouteComponentProps<{}>, ISignInState {
    updateError: (message: string) => void
    updatePassword: (password: string) => void
    updateUsername: (username: string) => void
    login: (e: React.FormEvent<HTMLFormElement>, credentials: any) => void
}

class SignInComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        const { errorMessage, credentials } = this.props;
        return (
            <div className="container h-100">
                <div className="row h-100">
                    <div className="mx-auto my-auto">
                        <Card>
                            <CardHeader className="text-white bg-dark">Sign in</CardHeader>
                            <CardBody className="bg-light">
                                {errorMessage &&
                                    <div className="alert alert-danger" role="alert">
                                        <span>{errorMessage}</span>
                                    </div>
                                }
                                <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.props.login(e, this.props.credentials)}>
                                    <Col>
                                        <FormGroup>
                                            <Input
                                                autoFocus
                                                onChange={(e: any) => this.props.updateUsername(e.target.value)}
                                                value={credentials.username}
                                                type="text"
                                                id="inputUsername"
                                                className="form-control"
                                                placeholder="Username"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Input
                                                onChange={(e: any) => this.props.updatePassword(e.target.value)}
                                                value={credentials.password}
                                                type="password"
                                                id="inputPassword"
                                                className="form-control"
                                                placeholder="Password"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Button color="primary" className="btn btn-lg btn-block" type="submit">Sign In</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => (state.signIn);
const mapDispatchToProps = {
    login: signInActions.login,
    updatePassword: signInActions.updatePassword,
    updateUsername: signInActions.updateUsername
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);