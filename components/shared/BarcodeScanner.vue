<template>
  <div>
    <video ref="barcodeScanner" id="barcode-scanner" width="300" height="200" autoplay></video>
    <canvas id="canvas" class="hidden"></canvas>
  </div>
</template>

<script>
import Quagga from '@ericblade/quagga2';

export default {
  mounted() {
    this.startCameraAndInitQuagga();
  },
  methods: {
    async startCameraAndInitQuagga() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 300,
            height: 200,
            facingMode: 'environment'
          }
        });
        this.$refs.barcodeScanner.srcObject = stream;

        // Initialize Quagga after the camera stream is set up
        this.initQuagga();

      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },
    initQuagga() {
      Quagga.init({
        inputStream: {
          type: 'LiveStream',
          target: this.$refs.barcodeScanner, // Ensure this is pointing to the correct video element
          constraints: {
            width: 300,
            height: 200,
            facingMode: 'environment'
          },
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader'],
        },
      }, (err) => {
        if (err) {
          console.error('Failed to initialize Quagga:', err);
          return;
        }
        console.log('Quagga initialized successfully');
        Quagga.start();
      });

      Quagga.onDetected(this.onDetected);
    },
    onDetected(result) {
      const code = result.codeResult.code;
      this.$emit('barcode-detected', code);
      Quagga.stop();
    }
  },
  beforeDestroy() {
    Quagga.stop();
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
