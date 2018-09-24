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
    sendImageToDatabase: (file: any) => void
}

class RegisterComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public uploadImage = (e: any) => {
        const file = e.target && e.target.files[0];
        this.props.sendImageToDatabase(file);     
    }

    public render() {
        const { errorMessage } = this.props;
        return (
            <div className="container h-100" id="register">
                <div className="row h-100">
                    <div className="mx-auto my-auto">
                        <Card>
                            <CardHeader className="text-white site-color">Register to create a playlist</CardHeader>
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
                                    <Col>
                                        <FormGroup>
                                        <label> Upload Profile Image: </label>
                                        <input
                                            onChange={this.uploadImage}
                                            type="file"
                                            id="inputPlaylistImage"
                                            className="form-control"
                                            placeholder="Upload Profile Image" />
                                        <div className="container">
                                                <img id="imagePreview" src={this.props.bucketKey} />
                                        </div>
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
            sendImageToDatabase: registerActions.sendImageToDatabase,
            updateBucketKey: registerActions.updateBucketKey,
            updateEmail: registerActions.updateEmail,
            updateFirstName: registerActions.updateFirstName,
            updateLastName: registerActions.updateLastName,
            updatePassword: registerActions.updatePassword,
            updateUsername: registerActions.updateUsername,
        }
        
export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);