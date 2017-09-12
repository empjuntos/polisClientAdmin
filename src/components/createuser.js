// Copyright (C) 2012-present, Polis Technology Inc. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import { connect } from "react-redux";
import { doCreateUser, doFacebookSignin } from "../actions";
import Radium from "radium";
import Flex from "./framework/flex";
import Button from "./framework/generic-button";
import Awesome from "react-fontawesome";
import {Link} from "react-router";
import StaticContentContainer from "./framework/static-content-container";
import strings from "../strings/strings";

const styles = {
  heading: {
    fontSize: 36,
    display: "block",
    marginBottom: 20,
    marginTop: 0
  },
  card: {
    position: "relative",
    zIndex: 10,
    padding: 20,
    borderRadius: 3,
    color: "rgb(130,130,130)"
  },
  button: {
    display: "block",
    backgroundColor: "#03a9f4",
    color: "white"
  },
  input: {
    display: "block",
    margin: "10px 0px",
    color: "rgb(100,100,100)",
    fontSize: 14,
    padding: 7,
    borderRadius: 3,
    border: "1px solid rgb(130,130,130)",
  },
  facebookButton: {
    border: 0,
    color: "white",
    backgroundColor: "#3b5998",
    fontWeight: 300,
    padding: "8px 12px",
    borderRadius: 5,
    fontSize: 14,
  },
  termsContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  links: {
    color: "rgb(130,130,130)",
    textDecoration: "underline"
  },
  signinContainer: {
    marginTop: 20
  },
  termsSmallprint: {
    fontSize: 12,
    maxWidth: 400,
    fontWeight: 300,
    lineHeight: 1.3,
    color: "rgb(130,130,130)"
  }
};

@connect(state => state.signin)
@Radium
class SignIn extends React.Component {

  getDest() {
    return this.props.location.pathname.slice("/createuser".length);
  }

  handleLoginClicked(e) {
    e.preventDefault();
    const attrs = {
      hname: this.refs.hname.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      gatekeeperTosPrivacy: true,
    };

    var dest = this.getDest();
    if (!dest.length) {
      dest = "/";
    }
    this.props.dispatch(doCreateUser(attrs, dest));
  }

  // componentDidMount() {
  //   window.addEventListener('resize', () => {}, true);
  // }

  facebookButtonClicked() {
    var dest = this.getDest();
    if (!dest.length) {
      dest = "/";
    }
    this.props.dispatch(doFacebookSignin(dest))
  }

  handleFacebookPasswordSubmit() {
    var dest = this.getDest();
    if (!dest.length) {
      dest = "/";
    }
    const optionalPassword = this.refs.facebook_password.value
    this.props.dispatch(doFacebookSignin(dest, optionalPassword))
  }
  maybeErrorMessage() {
    let markup = ""
    if (this.props.error) {
      markup = (
        <div style={styles.error}>
          { strings(this.props.error.responseText) }
        </div>
      );
    }
    return markup;
  }
  drawForm() {
    return (
      <div>
        <form>
          <input
            style={styles.input}
            ref="hname"
            placeholder="nome"
            type="text"/>
          <input
            style={styles.input}
            ref="email"
            placeholder="email"
            type="email"/>
          <input
            style={styles.input}
            ref="password"
            placeholder="senha"
            type="password"/>
          <input
            style={styles.input}
            ref="password2"
            placeholder="repita a senha"
            type="password"/>

          {this.maybeErrorMessage()}

          <div style={styles.termsContainer}>
            <p style={styles.termsSmallprint}>{"Eu concordo com o"}
              <a href="https://pol.is/tos" tabindex="110" style={styles.links}>
              pol.is terms</a> and <a href="https://pol.is/privacy" tabindex="111" style={styles.links} > privacy agreement</a>.
            </p>
          </div>

          <Button style={styles.button} onClick={this.handleLoginClicked.bind(this)}>
            {this.props.pending ? "Criando a conta..." : "Criar conta"}
          </Button>
        </form>
        <p style={styles.termsSmallprint}>
          {
            "Se você clicar em 'Logar com Facebook' e não for um usuário do Polis, você será registrado e aceitará nossa politica de privacidade"
          }
        </p>
        <Button
          style={styles.facebookButton}
          onClick={this.facebookButtonClicked.bind(this)}>
          <Awesome style={{
            color: "#3b5998",
            backgroundColor: "rgb(255,255,255)",
            padding: "3px 5px",
            borderRadius: 3,
          }} name="facebook"/>
        <span style={{marginLeft: 10}}>{"Sign up with Facebook"}</span>
        </Button>

        <div style={styles.signinContainer}>
          {"Já tem uma conta? "}
          <Link style={styles.links} tabindex="6" to={"/signin" + this.getDest()} data-section="signup-select">
            Sign in
          </Link>
        </div>

      </div>
    )
  }

  drawPasswordConnectFacebookForm() {
    return (
      <span>
        <p
          style={{
            fontSize: 16,
            maxWidth: 400,
            fontWeight: 100,
            lineHeight: 1.4
          }}>
          {
            "Um usuário pol.is já existe com esse email associado a uma conta do Facebook."
          }
        </p>
        <p
          style={{
            fontSize: 16,
            maxWidth: 400,
            fontWeight: 100,
            lineHeight: 1.4
          }}>
          {
            "Por favor entre a senha da sua conta pol.is para habilitar o login pelo Facebook."
          }
        </p>
        <input
          style={styles.input}
          ref="facebook_password"
          placeholder="senha do polis"
          type="password"/>
          <Button
            style={styles.button}
            onClick={this.handleFacebookPasswordSubmit.bind(this)}>
            { "Conectar conta do Facebook" }
          </Button>
      </span>
    );
  }

  render() {
    return (
      <StaticContentContainer
        backgroundColor={"#03a9f4"}
        headerBackgroundColor={"#03a9f4"}
        footerBackgroundColor={"#03a9f4"}
        image={false}>
        <Flex>
          <div style={styles.card}>
            <p style={styles.heading}>
              <Awesome name={"sign-in"} /> Criar conta
            </p>
            {
              this.props.facebookError !== "polis_err_user_with_this_email_exists" ?
                this.drawForm() : this.drawPasswordConnectFacebookForm()
            }
          </div>
        </Flex>
      </StaticContentContainer>
    );
  }
}

export default SignIn;
