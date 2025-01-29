<template>
  <v-container>
    <h1 class="text-center text-3xl font-bold mb-6">Certificate Generation</h1>

    <!-- Eligible Participants Table -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-icon class="mr-2 text-primary">mdi-certificate</v-icon>
            Eligible Participants (90% Attendance)
          </v-card-title>
          <v-card-text>
            <v-table dense>
              <thead>
                <tr>
                  <th class="text-left">Participant Name</th>
                  <th class="text-left">Trainings Attended</th>
                  <th class="text-left">Total Trainings</th>
                  <th class="text-left">Percentage</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(participant, index) in eligibleParticipants"
                  :key="index"
                >
                  <td>{{ participant.name }}</td>
                  <td>{{ participant.attended }}</td>
                  <td>{{ participant.total }}</td>
                  <td>{{ participant.percentage }}%</td>
                  <td>
                    <v-btn
                      color="primary"
                      text
                      @click="generateCertificate(participant)"
                    >
                      Generate
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Certificate Preview -->
    <v-dialog v-model="certificateDialog" max-width="1024px">
      <v-card>
        <v-card-title>
          Certificate Preview
        </v-card-title>
        <v-card-text>
          <!-- Certificate Content -->
          <div id="certificate" class="certificate-preview landscape">
            <h1 class="text-center text-4xl font-bold mb-6">
              Certificate of Completion
            </h1>
            <p class="text-center text-lg mb-4">
              This is to certify that
            </p>
            <h2 class="text-center text-3xl font-bold mb-4">
              {{ selectedParticipant.name }}
            </h2>
            <p class="text-center text-lg">
              has successfully completed {{ selectedParticipant.attended }}
              out of {{ selectedParticipant.total }} trainings with an
              attendance percentage of {{ selectedParticipant.percentage }}%.
            </p>
            <p class="text-center text-lg mt-8">
              Awarded on {{ new Date().toLocaleDateString() }}
            </p>

            <!-- Digital Signature and Stamp -->
            <div class="signature-stamp-container">
              <div class="signature">
                <img src="https://th.bing.com/th/id/OIP.zVUDGT5Yz2poMIwDWiipGwHaEm?rs=1&pid=ImgDetMain" alt="Digital Signature" />
                <p class="text-center">Authorized Signature</p>
              </div>
              <div class="stamp">
                <img src="https://th.bing.com/th/id/R.a3a174747e21eef06893ead3ce0d0ad9?rik=pJysaV8oH6nVXg&pid=ImgRaw&r=0" alt="Digital Stamp" />
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="printCertificate">
            Print
          </v-btn>
          <v-btn color="error" text @click="certificateDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      participants: [
        { name: "John Doe", attended: 9, total: 10 },
        { name: "Jane Smith", attended: 9, total: 10 },
        { name: "Emily Jones", attended: 10, total: 10 },
        { name: "Michael Brown", attended: 10, total: 10 },
      ],
      certificateDialog: false,
      selectedParticipant: {},
    };
  },
  computed: {
    eligibleParticipants() {
      // Filter participants with attendance >= 90%
      return this.participants
        .map((p) => ({
          ...p,
          percentage: Math.round((p.attended / p.total) * 100),
        }))
        .filter((p) => p.percentage >= 90);
    },
  },
  methods: {
    generateCertificate(participant) {
      this.selectedParticipant = participant;
      this.certificateDialog = true;
    },
    printCertificate() {
      const printContent = document.getElementById("certificate").innerHTML;
      const newWindow = window.open("", "_blank", );
      newWindow.document.open();
      newWindow.document.write(`
        <html>
          <head>
            <style>
              @page { size: A4 landscape; }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                text-align: center;
              }
              h1 {
                font-size: 2.5rem;
              }
              p {
                font-size: 1.2rem;
              }
              .signature-stamp-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 40px;
              }
              .signature, .stamp {
                width: 200px;
                text-align: center;
              }
              .signature img, .stamp img {
                width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      newWindow.document.close();
    },
  },
};
</script>
<style>


.signature-stamp-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}

.signature,
.stamp {
  width: 200px;
  text-align: center;
}

.signature img,
.stamp img {
  width: 100%;
  height: auto;
}
</style>
