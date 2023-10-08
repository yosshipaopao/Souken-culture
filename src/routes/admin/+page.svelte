<script lang="ts">
  import type {PageData} from "./$types";
  export let data: PageData;
</script>
<div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>user</th>
        <th>course</th>
        <th>quiz</th>
        <th>try</th>
        <th>correct</th>
        <th>last_answer</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      {#each data.data as row}
        <tr>
          {#each row as cell}
            <td>{cell}</td>
          {/each}
        </tr>
      {/each}
      </tbody>
  </table>
</div>