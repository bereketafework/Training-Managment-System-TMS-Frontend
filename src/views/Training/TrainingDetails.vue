<template>
  <div class="">
    <div>
      <v-toolbar flat class="overflow-x-auto !bg-neutral-100">
        <v-tabs
          v-model="tab"
          color="primary"
          direction="horizontal"
          class="flex h h-full !justify-between rounded-tl-lg rounded-tr-lg"
        >
          <v-tab
            prepend-icon="mdi-webhook"
            text="Sessions"
            value="Sessions"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <v-tab
            prepend-icon="mdi-eye"
            text="Details"
            value="Details"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>

          <v-tab
            prepend-icon="mdi-account-box-plus-outline"
            text="Guest"
            value="Guest"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>

          <v-tab
            prepend-icon="mdi-account-multiple"
            text="Team"
            value="Team"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <v-tab
            prepend-icon="mdi-account-reactivate"
            text="Enrollments"
            value="Enrollments"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <!-- <v-tab
            prepend-icon="mdi-account-cash"
            text="Sponsor"
            value="Sponsor"
           class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <v-tab
            prepend-icon="mdi-cash-fast"
            text="Allwoance"
            value="Allwoance"
           class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab> -->
          <v-tab
            prepend-icon="mdi-bag-personal"
            text="resource"
            value="resource"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
          <v-tab
            prepend-icon="mdi-account-multiple-check-outline"
            text="attendance"
            value="attendance"
            class="border-b-2 border-transparent px-5 py-2 cursor-pointer rounded-t-lg hover:bg-blue-50 !border-blue-500"
          ></v-tab>
    
        </v-tabs>
      </v-toolbar>
    </div>
    <div v-if="tab === 'Details'" class="m-4">
      <v-card
        class="!border-[1.5px] !shadow-sm !shadow-slate-600 !rounded-xl flex overflow-hidden !border-blue-500 !border-l-8 h-full"
        v-for="item in items"
        :key="item"
      >
        <div>
          <div class="flex justify-between">
            <h2
              class="top-0 flex justify-center border-t-0 w-fit border-l-0 border-[1px] text-sm mr-2 rounded-b-md border-black bg-green-400 h-fit p-[1px]"
            >
              <p class="m-[1px] flex flex-row justify-start items-center">
                {{ item.Training_mode }}
              </p>
            </h2>
            <h2
              class="top-0 flex justify-center border-t-0 w-20 border-r-0 border-[1px] ml-2 rounded-b-md border-blue-500 h-fit p-[1px]"
            >
              <p class="m-[1px] flex flex-row justify-start items-center">
                Details
              </p>
            </h2>
          </div>
          <div>
            <p class="m-2">
              <strong>Training Name:</strong> {{ item.Training_name }}
            </p>
          </div>
          <div class="flex flow-row justify-between m-2">
            <p><strong>Location:</strong>{{ item.Training_location }}</p>
            <p><strong>Capacity:</strong> {{ item.Capacity }}</p>
            <p>
              <strong>Cost:</strong> {{ item.Cost }}
              <span class="font-bold">ETB</span>
            </p>
          </div>
          <div class="flex flex-col justify-between m-2">
            <p>
              <strong> Descriptions:</strong>
              {{ item.Courses.Course_description }}
            </p>
            <p>
              <strong> Objectives:</strong>
              {{ item.Courses.Course_objective }}
            </p>
          </div>
          <div class="flex flow-row justify-between m-2">
            <p>
              <strong>Created by:</strong> {{ item.CreatedBy.First_name }}
              {{ item.CreatedBy.Middle_name }} {{ item.CreatedBy.Last_name }}
            </p>

            <p>
              <strong>Created at:</strong>
              {{ formatDate(item.Courses.Created_at) }}
            </p>

            <p>
              <strong>{{ assignGuestList.length }}:</strong>

              {{ assignGuestList.length > 1 ? "Guests" : "Guest" }}
            </p>

            <div>
              <strong class="m-3">Enrollment</strong>
              <div class="relative flex justify-center items-center">
                <v-progress-circular
                  :model-value="(EnrollmentList.length / item.Capacity) * 100"
                  color="green"
                  size="70"
                  width="10"
                >
                </v-progress-circular>
                <span
                  class="absolute text-sm font-bold"
                  style="color: var(--v-primary-base)"
                >
                  {{
                    Math.round((EnrollmentList.length / item.Capacity) * 100)
                  }}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- <h2 class="flex flex-row border-blue-500 p-10 rounded-tr-md rounded-bl-lg px-3 py-1 text-whit border-[1px] border-b-[2px] border-t-0 border-r-0 border--500 shadow"> Training Name: <h4> {{  item.Training_name  }}</h4></h2> -->
      </v-card>
    </div>
    <div v-if="tab === 'Sessions'" class="pt-[5px] !rounded-lg">
      <v-data-table
        :headers="headersSessions"
        :items="SessionList"
        :search="searchQuery"
        density="compact"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-btn
              color="blue"
              prepend-icon="mdi-plus"
              size="large"
              class="rounded-lg"
              variant="outlined"
              @click="toggleForm"
            >
              Add</v-btn
            >

            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Sessions
            </v-toolbar-title>
            <v-text-field
              class="bg-transparent"
              v-model="searchQuery"
              append-inner-icon="mdi-magnify"
              color="primary"
              density="comfortable"
              label="Search"
              variant="outlined"
              hide-details
              single-line
              clearable
            ></v-text-field>
            <v-btn
              icon="mdi-filter-outline"
              color="Primary"
              size="large"
              variant="text"
              @click="toggleFilterDialog"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                variant="text"
                color="gray-lighten-2"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item @click="selectItem(item)">Edit</v-list-item>
              <v-list-item @click="confirmDelete(item)">Delete</v-list-item>
            </v-list>
          </v-menu>
        </template></v-data-table
      >

      <v-overlay v-model="overlay" class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl ml-3">
            Training Session Form
          </span>

          <v-form ref="form" @submit.prevent="submit" class="m-3">
            <v-container
              fluid
              class="border-[1px] border-gray-200 !w-[900px] !rounded-lg"
            >
              <v-row class="!flex !flex-col !col-span-2">
                <v-col cols="14" sm="10">
                  <v-text-field
                    v-model="form.topic"
                    :rules="rules.topic"
                    color="black darken-2"
                    label="Topic"
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="14" sm="10">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    variant="outlined"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.sessions_start_date"
                        required
                        label="Session Start Date"
                        variant="outlined"
                        type="datetime-local"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.sessions_start_date"
                      variant="outlined"
                      no-title
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="14" sm="10">
                  <v-menu
                    v-model="menuEnd"
                    :close-on-content-click="true"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.sessions_end_date"
                        variant="outlined"
                        label="Session End Date"
                        type="datetime-local"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.sessions_end_date"
                      no-title
                      @input="menuEnd = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-card-actions>
                  <v-btn text @click="goBack">Back</v-btn>
                  <v-btn text @click="resetForm">Clear</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!formIsValid"
                    text
                    color="primary"
                    type="submit"
                    @click="createTraining"
                  >
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      size="20"
                    ></v-progress-circular>
                    Register
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>

    <div v-if="tab === 'Guest'" class="m-6" >
      <v-data-table
        :headers="headersGuest"
        :items="assignGuestList"
        :search="searchQuery"
        density="compact"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-btn
              color="blue"
              prepend-icon="mdi-plus"
              size="large"
              class="rounded-lg"
              variant="outlined"
              @click="toggleForm"
            >
              Add</v-btn
            >
            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Guests
            </v-toolbar-title>
            <v-text-field
              class="bg-transparent"
              v-model="searchQuery"
              append-inner-icon="mdi-magnify"
              color="primary"
              density="comfortable"
              label="Search"
              variant="outlined"
              hide-details
              single-line
              clearable
            ></v-text-field>
            <v-btn
              icon="mdi-filter-outline"
              color="Primary"
              size="large"
              variant="text"
              @click="toggleFilterDialog"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                variant="text"
                color="gray-lighten-2"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item @click="selectItem(item)">Edit</v-list-item>
              <v-list-item @click="confirmDelete(item)">Delete</v-list-item>
            </v-list>
          </v-menu>
        </template></v-data-table
      >
      <v-overlay v-model="overlay" class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl">
            Guest Assigning
          </span>

          <v-form ref="form" @submit.prevent="assignGuest" class="m-3">
            <v-container
              fluid
              class="border-[1px] border-gray-200 !flex !w-[800px] !rounded-lg"
            >
              <v-row>
                <v-col cols="20" sm="10">
                  <v-select
                    class="w-[700px]"
                    variant="outlined"
                    clearable
                    chips
                    label="Select Session"
                    :items="SessionList"
                    item-title="Topic"
                    item-value="id"
                    v-model="SelectedSessionIdForGuest"
                    :rules="[rules.required]"
                    multiple
                    required
                  ></v-select> </v-col
                ><v-col cols="20" sm="10">
                  <v-select
                    class="w-[700px]"
                    clearable
                    chips
                    label="Select Guest"
                    :items="GuestList"
                    :item-title="guestName"
                    item-value="id"
                    variant="outlined"
                    v-model="SelectedGuestId"
                    :rules="rules.required"
                  ></v-select>
                </v-col>

                <v-card-actions class="flex justify-between !w-[700px]">
                  <div>
                    <v-btn text @click="goBack">Back</v-btn>
                    <v-btn text @click="resetForm">Clear</v-btn>
                  </div>

                  <v-btn text color="primary" type="submit" variant="outlined">
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      size="20"
                    ></v-progress-circular>
                    Assign
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>

    <div v-if="tab === 'resource'" class="m-6">
      <v-data-table
        :headers="headersResource"
        :items="ResourceAllocationList"
        :search="searchQuery"
        density="compact"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-btn
              color="blue"
              prepend-icon="mdi-plus"
              size="large"
              class="rounded-lg"
              variant="outlined"
              @click="toggleForm"
            >
              Add</v-btn
            >
            <v-toolbar-title class="flex justify-center items-center !text-4xl">
              List of Resources
            </v-toolbar-title>
            <v-text-field
              class="bg-transparent"
              v-model="searchQuery"
              append-inner-icon="mdi-magnify"
              color="primary"
              density="comfortable"
              label="Search"
              variant="outlined"
              hide-details
              single-line
              clearable
            ></v-text-field>
            <v-btn
              icon="mdi-filter-outline"
              color="Primary"
              size="large"
              variant="text"
              @click="toggleFilterDialog"
            ></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                variant="text"
                color="gray-lighten-2"
              ></v-btn>
            </template>
            <v-list>
              <v-list-item @click="selectItem(item)">Edit</v-list-item>
              <v-list-item @click="confirmDelete(item)">Delete</v-list-item>
            </v-list>
          </v-menu>
        </template></v-data-table
      >
      <v-overlay v-model="overlay" class="!flex !justify-center items-center">
        <v-card flat class="bg-slate-300">
          <span class="flex justify-center border-b-[1px] text-3xl">
            Resource Assigning
          </span>

          <v-form ref="form" @submit.prevent="ResourceAllocation" class="m-3">
            <v-container
              fluid
              class="border-[1px] border-gray-200 !flex !w-[800px] !rounded-lg"
            >
              <v-row>
                <v-col cols="20" sm="10">
                  <v-select
                    class="w-[700px]"
                    clearable
                    chips
                    label="Select Session"
                    :items="SessionList"
                    item-title="Topic"
                    item-value="id"
                    variant="outlined"
                    v-model="SelectedSessionIdForResource"
                    :rules="rules.required"
                    required
                    multiple
                  ></v-select> </v-col
                ><v-col cols="20" sm="10">
                  <v-select
                    class="w-[700px]"
                    clearable
                    chips
                    label="Select Resource"
                    :items="ResourceList"
                    item-title="Name"
                    item-value="id"
                    variant="outlined"
                    v-model="SelectedResourceId"
                    :rules="rules.required"
                  ></v-select>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Quantity"
                    :rules="rules.name"
                    variant="outlined"
                    color="black darken-2"
                    label="Quantity"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.SingleCost"
                    :rules="rules.name"
                    color="black darken-2"
                    variant="outlined"
                    label="Single Cost"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8" sm="4">
                  <v-text-field
                    v-model="form.Provider"
                    :rules="rules.name"
                    color="black darken-5"
                    variant="outlined"
                    label="Provider"
                    required
                  ></v-text-field>
                </v-col>
                <v-card-actions class="flex justify-between !w-[700px]">
                  <div>
                    <v-btn text @click="goBack">Back</v-btn>
                    <v-btn text @click="resetForm">Clear</v-btn>
                  </div>

                  <v-btn text color="primary" type="submit" variant="outlined">
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      size="20"
                    ></v-progress-circular>
                    Assign
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-overlay>
    </div>
    <div v-if="tab === 'Enrollments'" class="m-6">
      <div>
        <v-data-table
          :headers="headersEnrollment"
          :items="EnrollmentList"
          :search="searchQuery"
          density="compact"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn
                color="blue"
                prepend-icon="mdi-plus"
                size="large"
                class="rounded-lg"
                variant="outlined"
                @click="toggleForm"
              >
                Add</v-btn
              >
              <v-toolbar-title
                class="flex justify-center items-center !text-4xl"
              >
                Enroll Participant
              </v-toolbar-title>
              <v-text-field
                class="bg-transparent"
                v-model="searchQuery"
                append-inner-icon="mdi-magnify"
                color="primary"
                density="comfortable"
                label="Search"
                variant="outlined"
                hide-details
                single-line
                clearable
              ></v-text-field>
              <v-btn
                icon="mdi-filter-outline"
                color="Primary"
                size="large"
                variant="text"
                @click="toggleFilterDialog"
              ></v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-dots-vertical"
                  variant="text"
                  color="gray-lighten-2"
                ></v-btn>
              </template>
              <v-list>
                <v-list-item @click="selectItem(item)">Edit</v-list-item>
                <v-list-item @click="confirmDelete(item)">Delete</v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:item.fullname="{ item }">
            <div class="flex flex-row gap-2">
              <p>{{ item.Participant.First_name }}</p>
              <p>{{ item.Participant.Middle_name }}</p>
              <p>{{ item.Participant.Last_name }}</p>
            </div>
          </template>
          <template v-slot:item.Created_at="{ item }">
            <div class="flex flex-row gap-2">
              <p>{{ formatDate(item.Created_at) }}</p>
            </div>
          </template>
        </v-data-table>
        <v-overlay v-model="overlay" class="!flex !justify-center items-center">
          <v-card flat class="bg-slate-300">
            <span class="flex justify-center border-b-[1px] text-3xl">
              Enrollment
            </span>

            <v-form ref="form" @submit.prevent="createEnrollment" class="m-3">
              <v-container
                fluid
                class="border-[1px] border-gray-200 !flex !w-[800px] !rounded-lg"
              >
                <v-row>
                  <v-col cols="20" sm="10">
                    <v-select
                      class="w-[700px]"
                      clearable
                      chips
                      label="Select Participant"
                      :items="ParticipantList"
                      item-title="Fullname"
                      item-value="id"
                      variant="outlined"
                      v-model="SelectedParticipantId"
                      :rules="rules.required"
                      multiple
                    ></v-select>
                  </v-col>

                  <v-card-actions class="flex justify-between !w-[700px]">
                    <div>
                      <v-btn text @click="goBack">Back</v-btn>
                      <v-btn text @click="resetForm">Clear</v-btn>
                    </div>

                    <v-btn
                      text
                      color="primary"
                      type="submit"
                      variant="outlined"
                    >
                      <v-progress-circular
                        v-if="loading"
                        indeterminate
                        size="20"
                      ></v-progress-circular>
                      Enroll
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-overlay>
      </div>
    </div>
    <div v-if="tab === 'Team'" class="m-6">
      <div>
        <v-data-table
          :headers="headersTeam"
          :items="TeamList"
          :search="searchQuery"
          density="compact"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn
                color="blue"
                prepend-icon="mdi-plus"
                size="large"
                class="rounded-lg"
                variant="outlined"
                @click="toggleForm"
              >
                Add</v-btn
              >
              <v-toolbar-title
                class="flex justify-center items-center !text-4xl"
              >
                List of Teams
              </v-toolbar-title>
              <v-text-field
                class="bg-transparent"
                v-model="searchQuery"
                append-inner-icon="mdi-magnify"
                color="primary"
                density="comfortable"
                label="Search"
                variant="outlined"
                hide-details
                single-line
                clearable
              ></v-text-field>
              <v-btn
                icon="mdi-filter-outline"
                color="Primary"
                size="large"
                variant="text"
                @click="toggleFilterDialog"
              ></v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-dots-vertical"
                  variant="text"
                  color="gray-lighten-2"
                ></v-btn>
              </template>
              <v-list>
                <v-list-item @click="selectItem(item)">Edit</v-list-item>
                <v-list-item @click="confirmDelete(item)">Delete</v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:item.username="{ item }">
            <div class="flex flex-row gap-2">
              <p>{{ item.User.First_name }}</p>
              <p>{{ item.User.Middle_name }}</p>
              <p>{{ item.User.Last_name }}</p>
            </div>
          </template>
        </v-data-table>
        <v-overlay v-model="overlay" class="!flex !justify-center items-center">
          <v-card flat class="bg-slate-300">
            <span class="flex justify-center border-b-[1px] text-3xl">
              Team Assigning
            </span>

            <v-form ref="form" @submit.prevent="assignTeam" class="m-3">
              <v-container
                fluid
                class="border-[1px] border-gray-200 !flex !w-[800px] !rounded-lg"
              >
                <v-row>
                  <v-col cols="20" sm="10">
                    <v-select
                      class="w-[700px]"
                      clearable
                      chips
                      label="Select Session"
                      :items="SessionList"
                      item-title="Topic"
                      item-value="id"
                      variant="outlined"
                      v-model="SelectedSessionIdForTeam"
                      :rules="rules.required"
                      multiple
                    ></v-select> </v-col
                  ><v-col cols="14" sm="7">
                    <v-select
                      class=""
                      clearable
                      chips
                      label="Select User"
                      :items="Allusers"
                      :item-title="guestName"
                      item-value="id"
                      variant="outlined"
                      v-model="SelectedUserId"
                      :rules="rules.required"
                    ></v-select>
                  </v-col>
                  <v-col cols="14" sm="5">
                    <v-select
                      class=""
                      clearable
                      chips
                      label="Select Role"
                      :items="TeamRoleList"
                      item-title="Team_role"
                      item-value="id"
                      variant="outlined"
                      v-model="SelectedTeamRoleId"
                      :rules="rules.required"
                    ></v-select>
                  </v-col>
                  <v-card-actions class="flex justify-between !w-[700px]">
                    <div>
                      <v-btn text @click="goBack">Back</v-btn>
                      <v-btn text @click="resetForm">Clear</v-btn>
                    </div>

                    <v-btn
                      text
                      color="primary"
                      type="submit"
                      variant="outlined"
                    >
                      <v-progress-circular
                        v-if="loading"
                        indeterminate
                        size="20"
                      ></v-progress-circular>
                      Assign
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-overlay>
      </div>
    </div>


    <div v-if="tab === 'attendance'" class="m-6">
      <v-data-table
        :headers="headersAttendance"
        :items="EnrollmentList"
        :search="searchQuery"
        density="compact"
        
      >
        <template v-slot:top>
          <div
            class="flex justify-between gap-4 bg-neutral-50 h-fit items-center p-4"
          >
            <v-row>
              <!-- First Name -->
              <v-col>
                <v-text-field
                  class="bg-transparent"
                  v-model="searchQuery"
                  append-inner-icon="mdi-magnify"
                  color="primary"
                  density="comfortable"
                  label="Search"
                  variant="outlined"
                  hide-details
                  single-line
                  clearable
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  density="comfortable"
                  chips
                  label="Select Session"
                  :items="SessionList"
                  item-title="Topic"
                  item-value="id"
                  variant="outlined"
                  v-model="SelectedSessionIdForAttendance"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  density="comfortable"
                  v-model="selectedDate"
                  label="Select Date"
                  outlined
                  type="date"
                  @change="logDate"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-list-item
            class="!stroke-black w-fit rounded-lg !border-[0.2px] !border-blue-700 m-1"
            :prepend-icon="item.isAttended ? '' : null"
            :loading="item.loading"
            @click="Attendance(item)"
          >
            <template v-if="item.isAttended">
              <v-icon icon="mdi-check-all" />
            </template>
            <template v-else> Attend </template>
          </v-list-item>
        </template>
      </v-data-table>
    </div>
    <!-- <v-snackbar v-model="snackbar1" :color="snackbarColor1">
      {{ snackbarMessage1.message }}
    </v-snackbar> -->
  </div>
</template>

<script>
import api from "@/service/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Africa/Nairobi");

import Resource from "../Resource/Resource.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
export default {
  components: { PrimaryButton },
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10), // Default to today's date
      SelectedSessionIdForAttendance: [],
      SelectedSessionIdForTeam: [],
      SelectedSessionIdForGuest: [],
      SelectedSessionIdForResource: [],

      SessionList: [],
      ParticipantList: [],
      SelectedTeamRoleId: [],
      Allusers: [],
      selecteditem: [],
      ResourceList: [],
      EnrollmentList: [],
      assignGuestList: [],
      attendParticipant: [],
      TeamList: [],
      TeamRoleList: [],
      ResourceAllocationList: [],
      overlay: false,
      searchQuery: "",
      SelectedSessionId: [],
      SelectedResourceId: [],
      SelectedUserId: [],
      SelectedParticipantId: [],
      GuestList: [],
      SelectedGuestId: [],
      training: null,
      tab: "Sessions",
      loading: false,
      form: {
        training_id: "",
        duration: "",
        topic: "",
        sessions_start_date: "",
        sessions_end_date: "",
        Provider: "",
        Quantity: "",
        SingleCost: "",
      },
      rules: {
        required: [(v) => !!v || "This field is required."],
        training_id: [(val) => !!val || "This field is required"],
        duration: [(val) => !!val || "This field is required"],
        topic: [(val) => !!val || "This field is required"],
      },
      headersSessions: [
        { title: "Topic", value: "Topic" },
        { title: "Session Start Date", value: "Session_start_date" },
        { title: "Session End Date", value: "Session_end_date" },
        { title: "Duration (days)", value: "diff" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      headersGuest: [
        { title: "First Name", value: "Guest.First_name" },
        { title: "Middle Name", value: "Guest.Middle_name" },
        { title: "Last Name", value: "Guest.Last_name" },
        { title: "Qualification", value: "Guest.Qualification" },
        { title: "Session", value: "Session.Topic" },
       
      ],
      headersResource: [
        { title: "Resource", value: "Resource.Name" },
        { title: "Session", value: "Session.Topic" },
        { title: "Provider", value: "Provider" },
        { title: "Quantity", value: "Quantity" },
        { title: "Single Cost", value: "Single_amount" },
        { title: "Total Cost", value: "total" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      headersTeam: [
        { title: "Name", value: "username" },
        { title: "Session", value: "Session.Topic", sortable: true },
        { title: "Role", value: "TeamRole.Team_role" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      headersEnrollment: [
        { title: "Name", value: "fullname" },
        { title: "Enroll Date", value: "Created_at", sortable: true },
      ],
      headersAttendance: [
        { title: "First Name", value: "Participant.First_name" ,sortable: true },
        { title: "Middle Name", value: "Participant.Middle_name" },
        { title: "Last Name", value: "Participant.Last_name" },
        { title: "Phone Number", value: "Participant.Phone" },
        { title: "Actions", value: "actions", sortable: false }, // Add actions column
      ],
    };
  },

  computed: {
    Search() {
      let results = this.items;
      if (this.searchQuery) {
        results = results.filter((item) =>
          Object.values(item).some((value) =>
            String(value)
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()),
          ),
        );
      }
      return results;
    },
    formIsValid() {
      return (
        this.form.topic &&
        this.form.sessions_start_date &&
        this.form.sessions_end_date
      );
    },
    guestName() {
      return (item) =>
        `${item.First_name} ${item.Middle_name} ${item.Last_name}`;
    },
  },

  methods: {
    async Attendance(item) {
      try {
        const SelectedParticipantId = item.Participant.id;
        const session = this.SelectedSessionIdForAttendance;
        const date = this.selectedDate;

        this.loading = true;

        // for( resourceId of this.SelectedResourceId){
        const response = await api.post("/attendance/create", {
          Session_id: session,
          Participant_id: SelectedParticipantId,
          Status: "true",
          Date: date,
        });
        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        item.isAttended = true;
        this.resetForm();
        this.fetchSession();
        this.fetchResourceAllocation();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async fetchEnrollment() {
      try {
        const tid = this.$route.params.id;
        const response = await api.post("/enrollment/select", { tid: tid });
        this.EnrollmentList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchParticipant() {
      try {
        const response = await api.get("/participant/allparticipant");
        this.ParticipantList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchUsers() {
      try {
        const response = await api.get("/User/all");
        this.Allusers = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchTeams() {
      try {
        const tid = this.$route.params.id;

        const response = await api.post("/team/select", { tid: tid });

        this.TeamList = response.data;

      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async fetchResourceAllocation() {
      try {
        const tid = this.$route.params.id;
        const response = await api.post(
          "/resourceallocation/allallocatedresource",
          { tid: tid },
        );
        const totalcoast = response.data.map((item) => {
          return {
            ...item,
            total: item.Quantity * item.Single_amount,
          };
        });
        const alldata = response.data && totalcoast;
        this.ResourceAllocationList = alldata;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async assignTeam() {
      try {
        this.loading = true;
        const sessionId = this.SelectedSessionIdForTeam;
        const userId = this.SelectedUserId;
        const teamRoleId = this.SelectedTeamRoleId;
      for (const sessionId of this.SelectedSessionIdForTeam) {
          const response = await api.post("/team/create", {
            Session_id: sessionId,
            User_id: userId,
            Team_role_id: teamRoleId,
            
          });
    
        }

        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.fetchSession();
        this.fetchTeams();
      } catch (error) {
        console.error(error);
        console.log(error)
        this.snackbarMessage1 = error?.response?.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
        this.fetchTeams();
      }
    },
    async fetchTeamRoleList() {
      try {
        const tid = this.$route.params.id;
        const response = await api.get("/teamrole/allteamroles", { tid: tid });
        this.TeamRoleList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    async fetchResource() {
      try {
        const response = await api.get("/resource/all");

        this.ResourceList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },
    async createEnrollment() {
      try {
        this.loading = true;

        const Training_id = this.$route.params.id;
        const participantId = this.SelectedParticipantId;
        for (const participantId of this.SelectedParticipantId) {
          const response = await api.post("/enrollment/create", {
            Training_id: Training_id,
            Participant_id: participantId,
          });
        }
        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.resetForm();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
        this.fetchEnrollment();
      }
    },

    async ResourceAllocation() {
      try {
        this.loading = true;
        const resourceId = this.SelectedResourceId;
        for (const sessionId of this.SelectedSessionIdForResource) {
          // for( resourceId of this.SelectedResourceId){
          const response = await api.post("/resourceallocation/create", {
            Session_id: sessionId,
            Resource_id: resourceId,
            Quantity: this.form.Quantity,
            Single_amount: this.form.SingleCost,
            Provider: this.form.Provider,
          });
        }
        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.resetForm();
        this.fetchSession();
        this.fetchResourceAllocation();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async assignGuest() {
      try {
        this.loading = true;
       const sessionId = this.SelectedSessionIdForGuest;
        const guestId = this.SelectedGuestId;
        const id = this.$route.params.id;
         for (const sessionId of this.SelectedSessionIdForGuest) {
          // for (const guestId of this.SelectedGuestId) {
          const response = await api.post("/guestassign/assignguest", {
            Sessions_id: sessionId,
            Guest_id: guestId,
            Training_id: id,
          });
        }
        
        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.fetchSession();
        this.fetchAssignedGuest();
      } catch (error) {
        console.log("Erroers"+error)
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async createTraining() {
      try {
        this.loading = true;
        const id = this.$route.params.id;
        const start = new Date(this.form.sessions_start_date);
        const end = new Date(this.form.sessions_end_date);

        const response = await api.post("/session/create", {
          Training_id: id,
          Topic: this.form.topic,
          Session_start_date: start,
          Session_end_date: end,
        });

        this.snackbarMessage1 = "Successfully Created ";
        this.snackbarColor1 = "green";
        this.snackbar1 = true;
        this.overlay = null;
        this.fetchSession();
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async fetchAssignedGuest() {
      try {
        const tid = this.$route.params.id;
        const response = await api.post("/guestassign/selectedassignedguests", {
          tid: tid,
        });
        this.assignGuestList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    async fetchGuest() {
      try {
        const tid = this.$route.params.id;

        const response = await api.get("/guest/all", { tid: tid });
        this.GuestList = response.data;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    async fetchSession() {
      try {
        const tid = this.$route.params.id;
        const response = await api.post("/session/select", { tid: tid });
        const newResponse = response.data.map((item) => {
          const sessionStartDate = dayjs.tz(
            item.Session_start_date,
            "Africa/Nairobi",
          );
          const sessionEndDate = dayjs.tz(
            item.Session_end_date,
            "Africa/Nairobi",
          );
          const durationInDays = sessionEndDate.diff(sessionStartDate, "day");
          const durationInHours =
            sessionEndDate.diff(sessionStartDate, "hour") % 24;

          return {
            ...item,
            Session_start_date: sessionStartDate.format("YYYY-MM-DD HH:mm A"),
            Session_end_date: sessionEndDate.format("YYYY-MM-DD HH:mm A"),
            diff: `${durationInDays} days ${durationInHours} hours`,
          };
        });
    
        this.SessionList = response.data && newResponse;
      } catch (error) {
        console.error(error);
        this.snackbarMessage1 = error.response.data;
        this.snackbarColor1 = "red";
        this.snackbar1 = true;
      }
    },

    toggleForm() {
      this.overlay = !this.overlay;
    },
    resetForm() {
      this.form = {
        training_id: "",
        duration: "",
        topic: "",
        sessions_start_date: "",
        sessions_end_date: "",
        Provider: "",
        Quantity: "",
        SingleCost: "",
      };
      this.$refs.form.reset();
    },
    submit() {
      if (this.selectedIndex === -1) {
        this.courses.push({ ...this.form });
      } else {
        this.courses.splice(this.selectedIndex, 1, { ...this.form });
        this.selectedIndex = -1;
      }
      this.snackbar = true;
      this.overlay = false;
      this.resetForm();
    },
    goBack() {
      this.$router.go(-1);
    },

    async fetchTrainingDetails() {
      try {
        const id = this.$route.params.id;
        const response = await api.get(`/training/search/${id}`);
        this.items = response.data;
      } catch (error) {
        console.error("Failed to fetch training details:", error);
      }
    },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
  },

  mounted() {
    this.fetchTrainingDetails();
    this.fetchSession();
    this.fetchGuest();
    this.fetchResource();
    this.fetchResourceAllocation();
    this.fetchAssignedGuest();
    this.fetchTeamRoleList();
    this.fetchUsers();
    this.fetchTeams();
    this.fetchParticipant();
    this.fetchEnrollment();
  },
};
</script>

<style></style>
