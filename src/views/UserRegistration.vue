<template>
  <v-card flat class="w-full" >
    <span class="flex  justify-center border-b-[1px] text-3xl ">User Registration Form</span>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Registration successful!</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
        
        <v-row>
          <v-col
            cols="8"
            sm="4">
            <v-text-field
              v-model="form.first"
              :rules="rules.name"
              color="black darken-2"
              label="First name"
              required
            ></v-text-field>
           </v-col>
           <v-col
            cols="8"
            sm="4"
            
          >
            <v-text-field
              v-model="form.middle"
              :rules="rules.name"
              color="black darken-4"
              label="Middle name"
              required
            ></v-text-field>
           </v-col><v-col
            cols="8"
            sm="4"
            
          >
            <v-text-field
              v-model="form.last"
              :rules="rules.name"
              color="black darken-5"
              label="Last name"
              required
            ></v-text-field>
           </v-col>
           <v-col
            cols="8"
            sm="4"
            
          >
            <v-text-field
              v-model="form.email"
              :rules="rules.email"
              color="black darken-5"
              label="Email"
              required
            ></v-text-field>
           </v-col>
           <v-col
            cols="8"
            sm="4"
            
          >
            <v-text-field
              v-model="form.phone"
              :rules="rules.name"
              color="black darken-2"
              label="Phone Number"
              type="number"
              required
            ></v-text-field>
           </v-col>
           
           <v-col
            cols="8"
            sm="4"
            
          >
            <v-text-field
              v-model="form.Username"
              :rules="rules.name"
              color="black darken-2"
              label="Username"
              required
            ></v-text-field>
           </v-col>
           <v-col
          cols="8"
          sm="4"
        >

          <v-text-field
          v-model="password"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.passwordRules"
            :type="show2 ? 'text' : 'password'"
            class="input-group--focused"
            hint="At least 8 characters"
            label="Password"
            required
            name="input-10-2"
            @click:append="show2 = !show2"
          ></v-text-field> </v-col>
          <v-col
          cols="8"
          sm="4"
        >
          <v-text-field
          v-model="confirmPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[confirmPasswordRules,passwordConfirmationRule]"
            :type="show2 ? 'text' : 'password'"
            class="input-group--focused"
            hint="At least 8 characters"
            label="Confirm Password"
            required
            name="input-10-2"
            @click:append="show2 = !show2"
          ></v-text-field> </v-col>
          <v-col
            cols="8"
            sm="4"
            
          >
          
            <v-select
              v-model="form.favoriteAnimal"
              :items="Countys"
              :rules="rules.Countys"
              
              label="Country"
              required
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
           
          </v-col>
          <v-col cols="12">
            <v-checkbox
              v-model="form.terms"
              color="green"
            >
              <template v-slot:label>
                <div @click.stop="">
                  Do you accept the
                  <a
                    href="#"
                    @click.prevent="terms = true"
                  >terms</a>
                  and
                  <a
                    href="#"
                    @click.prevent="conditions = true"
                  >conditions?</a>
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn
            text
            @click="goBack"
          >
            Back
          </v-btn>
        <v-btn
          text
          @click="resetForm"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!formIsValid"
          text
          color="primary"
          type="submit"
        >
          Register
        </v-btn>
      </v-card-actions>
    </v-form>
    <v-dialog
      v-model="terms"
      width="70%"
    >
      <v-card>
        <v-card-title class="text-h6">
          Terms
        </v-card-title>
        <v-card-text
          v-for="n in 5"
          :key="n"
        >
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="purple"
            @click="terms = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="conditions"
      width="70%"
    >
      <v-card>
        <v-card-title class="text-h6">
          Conditions
        </v-card-title>
        <v-card-text
          v-for="n in 5"
          :key="n"
        >
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer> </v-spacer>
          <v-btn
            text
            color="purple"
            @click="conditions = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  export default {
    data () {
      const defaultForm = Object.freeze({
        first: '',
        last: '',
        email: '',
        favoriteAnimal: '',
        age: null,
        terms: false,
        Username:'',
        phone:'',
        password: "",
        confirmPassword: "",
      })

      return {
        
        show2: false,
      
        password: "",
        confirmPassword: "",
        passwordRules: [v => !!v || "Password is required"],
        confirmPasswordRules: [v => !!v || "Password is required"],
        form: Object.assign({}, defaultForm),
        rules: {
          email: [
            val =>  /.+@.+\..+/.test(val) || 'E-mail must be valid',
          ],
          age: [
            val => val < 10 || `I don't believe you!`,
          ],
          Countys: [val => (val || '').length > 0 || 'This field is required'],
          name: [val => (val || '').length > 0 || 'This field is required'],
          passwordRules: [v => !!v || "Password is required"],
        confirmPasswordRules: [v => !!v || "Password is required"],
        },
        Countys: ['Ethiopia',],
        conditions: false,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.',
        snackbar: false,
        terms: false,
        defaultForm,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.favoriteAnimal &&
          this.form.terms
        )
      },
      
    passwordConfirmationRule() {
        return () => (this.password === this.confirmPassword) || 'Password must match'
    },
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      },
      goBack() {
        this.$router.go(-1)},
    },
    
  
  }
</script>